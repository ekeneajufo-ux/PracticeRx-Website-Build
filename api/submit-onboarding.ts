import type { VercelRequest, VercelResponse } from '@vercel/node';
import https from 'https';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    const payload = JSON.stringify(formData);

    const zapierUrl = process.env.ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/27828973/4bpi7p9/';
    const url = new URL(zapierUrl);

    await new Promise<void>((resolve, reject) => {
      const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };

      const request = https.request(options, (zapierRes) => {
        let data = '';
        zapierRes.on('data', (chunk) => { data += chunk; });
        zapierRes.on('end', () => {
          if (zapierRes.statusCode && zapierRes.statusCode >= 200 && zapierRes.statusCode < 300) {
            resolve();
          } else {
            reject(new Error(`Zapier returned status ${zapierRes.statusCode}: ${data}`));
          }
        });
      });

      request.on('error', reject);
      request.write(payload);
      request.end();
    });

    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error forwarding to Zapier:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
