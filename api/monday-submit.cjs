const MONDAY_API_URL = 'https://api.monday.com/v2';
const BOARD_ID = 18416195402;

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const ct = req.headers['content-type'] || '';
        if (ct.includes('application/json')) {
          resolve(JSON.parse(body));
        } else {
          const params = new URLSearchParams(body);
          const obj = {};
          for (const [k, v] of params) obj[k] = v;
          resolve(obj);
        }
      } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function buildColumnValues(data) {
  const cols = {};

  if (data.email || data.email_address) {
    const email = data.email || data.email_address;
    cols['email'] = JSON.stringify({ email, text: email });
  }

  if (data.phone || data.phone_number) {
    cols['phone'] = JSON.stringify({ phone: data.phone || data.phone_number, countryShortName: 'US' });
  }

  const notes = [];
  if (data.specialty)                                                          notes.push(`Specialty: ${data.specialty}`);
  if (data.practice_name)                                                      notes.push(`Practice Name: ${data.practice_name}`);
  if (data.practice_location || data.location)                                 notes.push(`Location: ${data.practice_location || data.location}`);
  if (data.startup_budget || data.budget)                                      notes.push(`Startup Budget: ${data.startup_budget || data.budget}`);
  if (data.timeline)                                                           notes.push(`Timeline to Open: ${data.timeline}`);
  if (data.income_goal || data.goal_income || data.goal_monthly_income)
    notes.push(`Income Goal (Year 1): ${data.income_goal || data.goal_income || data.goal_monthly_income}`);

  const specialtyFields = [
    'family_dpc_pricing', 'family_dpc_panel', 'family_dpc_medicare',
    'pediatric_dpc_pricing', 'pediatric_dpc_volume', 'pediatric_dpc_partnerships',
    'med_spa_services', 'med_spa_dispense', 'med_spa_visits',
    'plastic_surgery_facility', 'plastic_surgery_focus', 'plastic_surgery_financing',
    'psychiatry_delivery', 'psychiatry_medications', 'psychiatry_population', 'psychiatry_pricing',
    'concierge_retainer', 'concierge_insurance', 'concierge_panel',
    'wellness_services', 'wellness_delivery', 'wellness_revenue'
  ];
  for (const field of specialtyFields) {
    if (data[field]) notes.push(`${field.replace(/_/g, ' ')}: ${data[field]}`);
  }

  if (notes.length > 0) {
    cols['notes'] = JSON.stringify({ text: notes.join('\n') });
  }

  cols['status'] = JSON.stringify({ label: 'New Lead' });

  return JSON.stringify(cols);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  let data;
  try {
    data = await parseBody(req);
  } catch (e) {
    res.status(400).json({ error: 'Invalid request body' });
    return;
  }

  if (data.contact) data = { ...data, ...data.contact };

  const name = data.name || data.full_name || data.contact_name || 'Unknown';
  const columnValues = buildColumnValues(data);

  const mutation = `
    mutation {
      create_item(
        board_id: ${BOARD_ID},
        item_name: ${JSON.stringify(name)},
        column_values: ${JSON.stringify(columnValues)}
      ) {
        id
        name
      }
    }
  `;

  try {
    const response = await fetch(MONDAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.MONDAY_API_KEY,
        'API-Version': '2024-01',
      },
      body: JSON.stringify({ query: mutation }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Monday.com API errors:', result.errors);
      res.status(500).json({ error: 'Monday.com API error', details: result.errors });
      return;
    }

    const item = result?.data?.create_item;
    res.status(200).json({ success: true, item_id: item?.id, item_name: item?.name });

  } catch (e) {
    console.error('Failed to create Monday.com item:', e);
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
};
