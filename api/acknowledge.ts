import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Domaincủa Aruba cần đọc được response này
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain');
  
  // Đây là chuỗi ma thuật mà Aruba Instant On đang chờ đợi
  // Khi AP đọc thấy chuỗi này, nó sẽ cấp quyền truy cập Internet cho thiết bị
  res.status(200).send('Aruba.InstantOn.Acknowledge');
}
