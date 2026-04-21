import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {
  const [isConnecting, setIsConnecting] = useState(false);

  // 1. Phân tích URL ngay từ lúc trang bắt đầu tải
  const urlParams = new URLSearchParams(window.location.search);
  const debugParams = {
    post: urlParams.get('post'),
    mac: urlParams.get('mac'),
    ip: urlParams.get('ip'),
    url: urlParams.get('url')
  };

  // 2. Xác định cấu hình đích (Luôn dùng HTTPS chuẩn)
  const postDomain = debugParams.post || "captive-2022.aio.cloudauth.net";
  const targetUrl = `https://${postDomain}/cgi-bin/login`;

  // 3. React tự động tạo các thẻ input ẩn cho tất cả các thông số
  const hiddenInputs: any[] = [];
  urlParams.forEach((value, key) => {
    if (key !== 'post' && key !== 'cmd') {
      hiddenInputs.push(<input key={key} type="hidden" name={key} value={value} />);
    }
  });

  return (
    <div className="portal-wrapper">
      <header className="logo-container">
        <motion.img
           src={logo}
           alt="Nhất Tín Logistics Logo"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           style={{ height: '38px', width: 'auto' }}
        />
      </header>

      <motion.img 
        src={illustration} 
        alt="Logistics Illustration" 
        className="illustration-img"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />

      <motion.div 
        className="portal-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="wifi-icon-wrapper">
          <Wifi size={32} strokeWidth={2.5} />
        </div>
        
        <h1 className="portal-title">Truy cập Mạng Wi-Fi</h1>
        <p className="portal-subtitle">
          Chào mừng bạn đến với mạng Wi-Fi Nhất Tín Logistics
        </p>

        {/* Bảng hệ thống tự quét thông tin thiết bị (Ẩn nếu bạn không muốn khách thấy) */}
        <div style={{ fontSize: '10px', background: '#f0f0f0', padding: '10px', marginBottom: '15px', borderRadius: '5px', textAlign: 'left', color: '#666', borderLeft: '3px solid #d91500' }}>
          <strong>Trạng thái kết nối từ hệ thống:</strong><br/>
          Server trạm: {debugParams.post ? 'Đã nhận diện' : 'Mặc định'}<br/>
          Thiết bị (MAC): {debugParams.mac || 'Đang quét...'}<br/>
          Cổng kết nối: {debugParams.ip || 'Đang quét...'}
        </div>

        {/* FORM THUẦN HTML: Trình duyệt không thể chặn */}
        <form 
          id="aruba-login-form" 
          method="POST" 
          action={targetUrl}
          onSubmit={() => setIsConnecting(true)}
          style={{ width: '100%' }}
        >
          {/* Lệnh cơ bản của Aruba */}
          <input type="hidden" name="cmd" value="authenticate" />
          <input type="hidden" name="user" value="guest" />
          <input type="hidden" name="password" value="guest" />

          {/* Render toàn bộ thông số tự động từ vòng lặp React */}
          {hiddenInputs}

          <button 
            type="submit" 
            id="btn-connect" 
            className="connect-button" 
            disabled={isConnecting}
            style={{ 
              width: '100%', 
              padding: '15px', 
              background: '#e31a1a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              fontWeight: 'bold', 
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              opacity: isConnecting ? 0.7 : 1
            }}
          >
            {isConnecting ? "Đang cấp quyền..." : "Truy cập Wifi"}
          </button>
        </form>
      </motion.div>

      <motion.div 
        className="hotline-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Hotline: 1900 63 6688
      </motion.div>
    </div>
  );
}

export default App;
