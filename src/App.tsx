
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {
  // 1. Phân tích URL ngay từ lúc trang bắt đầu tải
  const urlParams = new URLSearchParams(window.location.search);
  const debugParams = {
    post: urlParams.get('post'),
    mac: urlParams.get('mac'),
    ip: urlParams.get('ip'),
    url: urlParams.get('url'),
    errmsg: urlParams.get('errmsg') || urlParams.get('error')
  };

  // 2. Xác định cấu hình đích 
  const postDomain = debugParams.post || "captive-2022.aio.cloudauth.net";
  const targetUrl = `https://${postDomain}/cgi-bin/login`;

  // 3. React tự động tạo các thẻ input ẩn
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

        {/* Bảng hệ thống Debug Nâng cao */}
        <div style={{ fontSize: '10px', background: '#ffebee', padding: '10px', marginBottom: '15px', borderRadius: '5px', textAlign: 'left', color: '#b71c1c', borderLeft: '3px solid #d91500', wordBreak: 'break-all' }}>
          <strong>Trạng thái kết nối từ hệ thống:</strong><br/>
          Mã lỗi trả về (nếu có): <b>{debugParams.errmsg || 'Không có mã lỗi'}</b><br/>
          MAC: {debugParams.mac || 'Trống'} | IP: {debugParams.ip || 'Trống'}<br/>
          Domain Post: {debugParams.post || 'Mặc định'}<br/>
        </div>

        {/* FORM THUẦN HTML */}
        <form 
          id="aruba-login-form" 
          method="POST" 
          action={targetUrl}
          style={{ width: '100%' }}
        >
          {/* Lệnh cơ bản của Aruba */}
          <input type="hidden" name="cmd" value="authenticate" />
          <input type="hidden" name="user" value="" />
          <input type="hidden" name="password" value="" />
          <input type="hidden" name="accept" value="true" />

          {/* Render toàn bộ thông số tự động từ vòng lặp React */}
          {hiddenInputs}

          <button 
            type="submit" 
            id="btn-connect" 
            className="connect-button" 
            onClick={(e) => {
              // Chỉ đổi giao diện nút, không dùng React State để Form gửi đi 100% mượt mà
              const btn = e.currentTarget;
              setTimeout(() => {
                btn.innerText = "Đang kết nối vào hệ thống...";
                btn.style.opacity = "0.7";
              }, 10);
            }}
            style={{ 
              width: '100%', 
              padding: '15px', 
              background: '#e31a1a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              fontWeight: 'bold', 
              cursor: 'pointer'
            }}
          >
            Truy cập Wifi
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
