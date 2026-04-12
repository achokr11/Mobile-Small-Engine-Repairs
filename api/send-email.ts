import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // Set a 15-second timeout for this specific route
  // Note: Vercel has its own function timeouts, but this helps for consistency
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('--- Vercel API: New Email Request ---');
  const { name, phone, equipment, issue } = req.body;

  if (!name || !phone || !equipment || !issue) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return res.status(500).json({ error: 'SMTP configuration is missing on server.' });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
    
    await transporter.sendMail({
      from: `"Mobile Engine Pro" <${fromEmail}>`,
      to: 'amir@claritylawfirm.com',
      subject: `🛠️ New Quote Request: ${equipment} from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1a202c;">
          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">
              ENGINE<span style="color: #ff6600;">PRO</span>
            </h1>
            <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">New Service Lead</p>
          </div>
          
          <div style="padding: 32px; background-color: #ffffff;">
            <h2 style="margin-top: 0; color: #0f172a; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">Customer Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-weight: 600; width: 140px;">Customer Name:</td>
                <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">
                  <a href="tel:${phone}" style="color: #ff6600; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Equipment:</td>
                <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">${equipment}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6600;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Issue Description</h3>
              <p style="margin: 0; color: #334155; line-height: 1.6; font-style: italic;">"${issue}"</p>
            </div>

            <div style="margin-top: 32px; text-align: center;">
              <a href="tel:${phone}" style="display: inline-block; background-color: #ff6600; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Call Customer Now</a>
            </div>
          </div>

          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
            <p style="margin: 0;">This lead was generated from the Mobile Engine Pro website.</p>
            <p style="margin: 4px 0 0 0;">&copy; ${new Date().getFullYear()} Mobile Engine Pro. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log('--- Vercel API: Email sent successfully! ---');
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('--- Vercel API: SMTP Error ---');
    console.error(err);
    return res.status(500).json({ error: err.message || 'Failed to send email' });
  }
}
