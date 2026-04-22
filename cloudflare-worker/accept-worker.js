/**
 * Cloudflare Worker - Aruba Instant On Captive Portal Accept Handler
 * 
 * QUAN TRỌNG: Worker này PHẢI được serve qua HTTP (không phải HTTPS)
 * để AP Aruba có thể đọc được chuỗi "Aruba.InstantOn.Acknowledge"
 * trong response body và cấp quyền truy cập Internet.
 * 
 * Cấu hình Cloudflare cần thiết:
 *   SSL/TLS → Overview → Off (HTTP only)
 *   SSL/TLS → Edge Certs → "Always Use HTTPS" → OFF
 */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Cho phép tất cả domain access (CORS)
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }

  // Route /accept: Trả về chuỗi ma thuật Aruba nhận diện
  if (url.pathname === '/accept' || url.pathname === '/accept/') {
    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Đang kết nối...</title>
  <style>
    body {
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .box {
      text-align: center;
      padding: 40px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }
    h2 { color: #d91500; }
    p { color: #555; }
  </style>
</head>
<body>
  <!--
    Đây là chuỗi ma thuật Aruba Instant On cần "thấy" trong HTTP response body.
    AP đọc được chuỗi này (qua HTTP, không phải HTTPS) và cấp quyền Internet.
  -->
  Aruba.InstantOn.Acknowledge
  <div class="box">
    <h2>✅ Đang kết nối Wi-Fi...</h2>
    <p>Bạn sẽ được chuyển sang Internet trong giây lát.</p>
  </div>
  <script>
    // Sau 2 giây chuyển hướng về trang web công ty
    setTimeout(function() {
      window.location.href = 'https://ntlogistics.vn';
    }, 2000);
  </script>
</body>
</html>`

    return new Response(html, { headers: corsHeaders })
  }

  // Route khác: 404
  return new Response('Not found', { status: 404, headers: corsHeaders })
}
