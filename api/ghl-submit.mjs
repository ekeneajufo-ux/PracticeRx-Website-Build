// GHL Contact Creation — ESM serverless function
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Parse body
  let data;
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString();
    const ct = req.headers['content-type'] || '';
    data = ct.includes('application/json') ? JSON.parse(body) : Object.fromEntries(new URLSearchParams(body));
  } catch (e) {
    res.status(400).json({ error: 'Invalid request body' });
    return;
  }

  const API_KEY = process.env.GHL_API_KEY;
  const LOCATION_ID = process.env.GHL_LOCATION_ID;

  if (!API_KEY || !LOCATION_ID) {
    res.status(500).json({ error: 'GHL credentials not configured' });
    return;
  }

  // Split name into first/last
  const nameParts = (data.name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Unknown';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Build notes from all form answers
  const noteLines = [];
  if (data.specialty)      noteLines.push(`Specialty: ${data.specialty}`);
  if (data.practice_name)  noteLines.push(`Practice Name: ${data.practice_name}`);
  if (data.location)       noteLines.push(`Location: ${data.location}`);
  if (data.startup_budget) noteLines.push(`Startup Budget: ${data.startup_budget}`);
  if (data.timeline)       noteLines.push(`Timeline to Open: ${data.timeline}`);
  if (data.goal_income)    noteLines.push(`Income Goal (Yr 1): ${data.goal_income}`);

  const specialtyFields = [
    'family_dpc_pricing','family_dpc_panel','family_dpc_medicare',
    'pediatric_dpc_pricing','pediatric_dpc_volume','pediatric_dpc_partnerships',
    'med_spa_services','med_spa_dispense','med_spa_visits',
    'plastic_surgery_facility','plastic_surgery_focus','plastic_surgery_financing',
    'psychiatry_delivery','psychiatry_medications','psychiatry_population','psychiatry_pricing',
    'concierge_retainer','concierge_insurance','concierge_panel',
    'wellness_services','wellness_delivery','wellness_revenue'
  ];
  for (const f of specialtyFields) {
    if (data[f]) noteLines.push(`${f.replace(/_/g, ' ')}: ${data[f]}`);
  }
  if (data.timestamp) noteLines.push(`Submitted: ${data.timestamp}`);

  const tags = ['intake-form'];
  if (data.specialty) tags.push(data.specialty.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''));

  const contactPayload = {
    firstName,
    lastName,
    email: data.email || '',
    phone: data.phone || '',
    companyName: data.practice_name || '',
    address1: data.location || '',
    locationId: LOCATION_ID,
    tags,
    source: 'PracticeRx Intake Form',
  };

  try {
    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    });

    const contactResult = await contactRes.json();

    if (!contactRes.ok) {
      console.error('GHL create contact error:', contactResult);
      res.status(500).json({ error: 'Failed to create GHL contact', details: contactResult });
      return;
    }

    const contactId = contactResult?.contact?.id;

    // Add a note with all specialty details
    if (contactId && noteLines.length > 0) {
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: noteLines.join('\n') }),
      }).catch(e => console.warn('Note creation failed (non-fatal):', e.message));
    }

    res.status(200).json({ success: true, contactId });
  } catch (e) {
    console.error('GHL submission error:', e);
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
}
