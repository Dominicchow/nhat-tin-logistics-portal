import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Nhận params từ POST body (form submit)
  const params = (req.body as Record<string, string>) || {};
  const postDomain = params['post'] || 'captive-2022.aio.cloudauth.net';

  // HTTP 307 giữ nguyên method (POST) và body
  // Browser tự POST lên http://{postDomain}/cgi-bin/login với chính xác body gốc
  res.setHeader('Location', `http://${postDomain}/cgi-bin/login`);
  res.status(307).end();
}
