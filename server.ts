import express from 'express';
import { createServer as createViteServer } from 'vite';

console.log('>>> SERVER INITIALIZING <<<');

import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      throw new Error('SMTP configuration is missing. Please check your secrets (SMTP_HOST, SMTP_USER, SMTP_PASS).');
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
  }
  return transporter;
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const SERVER_ID = Math.random().toString(36).substring(7);

  console.log(`[${SERVER_ID}] Server starting...`);
  console.log(`[${SERVER_ID}] NODE_ENV:`, process.env.NODE_ENV);

  app.use(express.json());

  // Log all requests for debugging
  app.use((req, res, next) => {
    console.log(`[${SERVER_ID}] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      serverId: SERVER_ID,
      environment: process.env.NODE_ENV,
      isProd: process.env.NODE_ENV === 'production' || process.env.VITE_USER_NODE_ENV === 'production' || !!process.env.K_SERVICE,
      time: new Date().toISOString()
    });
  });

  // Simple test route
  app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working', serverId: SERVER_ID });
  });

  // Root ping for simple connectivity test
  app.get('/ping', (req, res) => {
    res.send(`pong - ${SERVER_ID}`);
  });

  // API Route for sending emails
  app.post('/api/send-email', async (req, res) => {
    // Set a 15-second timeout for this specific route
    req.setTimeout(15000);
    
    console.log('--- New Email Request ---');
    console.log('Body:', req.body);
    const { name, phone, equipment, issue } = req.body;

    if (!name || !phone || !equipment || !issue) {
      console.warn('Validation failed: Missing fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      console.log('1. Getting transporter...');
      const mailClient = getTransporter();
      const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
      
      console.log(`2. Attempting to send email from ${fromEmail}...`);
      
      // Use a promise with a timeout for the sendMail call itself
      const sendMailPromise = mailClient.sendMail({
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

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('SMTP Send Timeout')), 12000)
      );

      await Promise.race([sendMailPromise, timeoutPromise]);

      console.log('3. Email sent successfully!');
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('--- SMTP Error ---');
      console.error(err);
      
      let errorMessage = 'Failed to send email';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else if (err && typeof err === 'object') {
        try {
          errorMessage = JSON.stringify(err);
        } catch (e) {
          errorMessage = 'An unknown error occurred';
        }
      }
      res.status(500).json({ error: errorMessage });
    }
  });

  // Catch-all for API routes that don't exist
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: `API route not found: ${req.method} ${req.url}` });
  });

  // Vite middleware for development
  const isProd = process.env.NODE_ENV === 'production' || 
                 process.env.VITE_USER_NODE_ENV === 'production' || 
                 !!process.env.K_SERVICE; // K_SERVICE is set in Cloud Run
  
  if (!isProd) {
    console.log(`[${SERVER_ID}] Starting in DEVELOPMENT mode...`);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log(`[${SERVER_ID}] Starting in PRODUCTION mode...`);
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`[${SERVER_ID}] Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[${SERVER_ID}] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
