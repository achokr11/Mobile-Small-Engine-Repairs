export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    serverId: 'Vercel-Serverless',
    environment: process.env.NODE_ENV,
    platform: 'Vercel Serverless',
    time: new Date().toISOString()
  });
}
