import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [buttonText, setButtonText] = useState("Truy cập Wifi");
  const [showDebug, setShowDebug] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Lấy dữ liệu từ URL để hiển thị debug
  const urlParams = new URLSearchParams(window.location.search);
  const debugParams = {
    post: urlParams.get('post'),
    mac: urlParams.get('mac'),
    ip: urlParams.get('ip'),
    url: urlParams.get('url')
  };

  const loginAruba = (event: React.FormEvent) => {
    // 1. NGĂN CHẶN TRANG TỰ ĐỘNG RELOAD
    event.preventDefault();

    // 2. Lấy dữ liệu từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const postDomain = urlParams.get('post') || "captive-2022.aio.cloudauth.net";
    // Phải dùng HTTPS để dữ liệu POST không bị mất đi qua khâu Redirect của Server
    const targetUrl = `https://${postDomain}/cgi-bin/login`;

    // 3. Hiệu ứng UI
    setIsConnecting(true);
    setButtonText("Đang cấp quyền mạng...");

    if (formRef.current) {
      // 4. Thiết lập Action
      formRef.current.action = targetUrl;
      
      // 5. "VÒNG LẶP THẦN THÁNH": Gom tất cả tham số vào form
      const existingDynamicInputs = formRef.current.querySelectorAll('.dynamic-input');
      existingDynamicInputs.forEach(el => el.remove());

      urlParams.forEach((value, key) => {
          if (key !== 'post' && key !== 'cmd') {
              const hiddenInput = document.createElement('input');
              hiddenInput.type = 'hidden';
              hiddenInput.name = key;
              hiddenInput.value = value;
              hiddenInput.className = 'dynamic-input';
              formRef.current?.appendChild(hiddenInput);
          }
      });

      // 6. Bắt buộc cung cấp tài khoản mặc định để Aruba AIO mở cổng
      const addHidden = (name: string, val: string) => {
          const inp = document.createElement('input');
          inp.type = 'hidden';
          inp.name = name;
          inp.value = val;
          inp.className = 'dynamic-input';
          formRef.current?.appendChild(inp);
      };
      addHidden('user', 'guest');
      addHidden('password', 'guest');

      // 7. Gửi lệnh đi!
      setTimeout(() => {
        formRef.current?.submit();
      }, 100);
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
           onClick={() => setShowDebug(!showDebug)} // Bấm logo để hiện debug
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

        {showDebug && (
          <div style={{ fontSize: '10px', background: '#f0f0f0', padding: '10px', marginBottom: '15px', borderRadius: '5px', textAlign: 'left', color: '#666' }}>
            <strong>Debug Info:</strong><br/>
            Post: {debugParams.post || 'N/A'}<br/>
            MAC: {debugParams.mac || 'N/A'}<br/>
            IP: {debugParams.ip || 'N/A'}<br/>
            Target: {`https://${debugParams.post || 'captive-2022.aio.cloudauth.net'}/cgi-bin/login`}
          </div>
        )}

        <form 
          id="aruba-login-form" 
          method="POST" 
          ref={formRef}
          style={{ width: '100%' }}
        >
          <input type="hidden" name="cmd" value="authenticate" />

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
