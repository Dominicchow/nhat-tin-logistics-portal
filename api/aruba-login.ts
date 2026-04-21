import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = req.query as Record<string, string>;
  const postDomain = query['post'] || 'captive-2022.aio.cloudauth.net';

  // Build POST body: cmd=login + tất cả params từ Aruba
  const body = new URLSearchParams();
  body.set('cmd', 'login');
  for (const [key, value] of Object.entries(query)) {
    if (!['post', 'cmd', 'errmsg', 'error'].includes(key)) {
      body.set(key, value);
    }
  }

  try {
    // Server-side POST lên Aruba qua HTTP (không bị Mixed Content block!)
    const arubaRes = await fetch(`http://${postDomain}/cgi-bin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      redirect: 'manual', // Không tự follow redirect
    });

    const responseText = await arubaRes.text();

    // Nếu Aruba trả về redirect → có nghĩa là đăng nhập thành công
    if (arubaRes.status === 301 || arubaRes.status === 302 || arubaRes.status === 303) {
      // Thành công! Redirect người dùng về trang chủ
      res.redirect(302, 'https://ntlogistics.vn');
      return;
    }

    // Trả về nội dung Aruba phản hồi để debug
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(arubaRes.status).send(`[Aruba status: ${arubaRes.status}]\n\n${responseText}`);
  } catch (err: any) {
    res.status(500).send(`[Proxy Error] ${err.message}`);
  }
}
