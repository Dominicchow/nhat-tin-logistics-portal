import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [buttonText, setButtonText] = useState("Truy cập Wifi");
  const formRef = useRef<HTMLFormElement>(null);

  const loginAruba = () => {
    // 1. Đọc tất cả tham số từ URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. Lấy tên miền Cloud Auth, MAC và IP
    const postDomain = urlParams.get('post');
    const clientMac = urlParams.get('mac');
    const clientIp = urlParams.get('ip');

    // 3. Hiệu ứng UX nút bấm
    setIsConnecting(true);
    setButtonText("Đang cấp quyền mạng...");

    // 4. Lắp ghép đường link Action để gửi lệnh đi
    let targetDomain = postDomain ? postDomain : "captive-2022.aio.cloudauth.net";
    
    if (formRef.current) {
      // Cập nhật action trực tiếp cho form
      formRef.current.action = `https://${targetDomain}/cgi-bin/login`;
      
      // Gán MAC và IP vào các input ẩn (sử dụng name attribute)
      const macInput = formRef.current.querySelector('input[name="mac"]') as HTMLInputElement;
      const ipInput = formRef.current.querySelector('input[name="ip"]') as HTMLInputElement;
      
      if (macInput && clientMac) macInput.value = clientMac;
      if (ipInput && clientIp) ipInput.value = clientIp;

      // 5. Gửi lệnh mở mạng!
      formRef.current.submit();
    }
  };

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

        <form
          id="aruba-login-form"
          method="POST"
          action=""
          style={{ width: '100%' }}
          ref={formRef}
        >
          <input type="hidden" name="user" value="guest" />
          <input type="hidden" name="password" value="guest" />
          <input type="hidden" name="cmd" value="authenticate" />
          <input type="hidden" name="mac" value="" />
          <input type="hidden" name="ip" value="" />
          <input type="hidden" name="url" value="https://ntlogistics.vn" />

          <button
            type="button"
            id="btn-connect"
            className="connect-button"
            onClick={loginAruba}
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
            {buttonText}
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
