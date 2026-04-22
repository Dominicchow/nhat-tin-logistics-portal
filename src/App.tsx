import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import SuccessPage from './components/SuccessPage';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const errmsg     = urlParams.get('errmsg') || urlParams.get('error') || '';
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleAccept() {
    setIsConnecting(true);
    
    // Bước 1: Hiện thanh loading giả lập
    setTimeout(() => {
      setIsConnecting(false);
      setShowSuccess(true); // Hiện diện giao diện SuccessPage (UI React)
      
      // Bước 2: Sau khi người dùng đã nhìn thấy Success UI, 
      // ta mới thực hiện redirect sang HTTP để Aruba "ngửi" thấy mã ACK.
      setTimeout(() => {
        const params = new URLSearchParams();
        urlParams.forEach((v, k) => params.set(k, v));
        
        // ÉP BUỘC dùng HTTP (không phải HTTPS) để Aruba có thể đọc được payload
        const baseUrl = window.location.host;
        window.location.href = `http://${baseUrl}/accept.html?${params.toString()}`;
      }, 1500);
    }, 1000);
  }

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

        {errmsg && (
          <p style={{ color: '#d91500', fontSize: '13px', marginBottom: '8px' }}>
            ⚠️ {errmsg}
          </p>
        )}

        {/* Nút Accept → navigate sang HTTP Surge.sh → AP đọc Aruba.InstantOn.Acknowledge */}
        <button
          id="btn-connect"
          className="connect-button"
          onClick={handleAccept}
          disabled={isConnecting}
          style={{
            width: '100%',
            padding: '15px',
            background: isConnecting ? '#ccc' : '#e31a1a',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: isConnecting ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {isConnecting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%'
                }}
              />
              Đang kết nối...
            </>
          ) : 'Truy cập Wifi'}
        </button>
      </motion.div>

      <motion.div 
        className="hotline-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Hotline: 1900 63 6688
      </motion.div>

      {/* Hiển thị SuccessPage đè lên khi đã kết nối */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999
        }}>
          <SuccessPage />
        </div>
      )}
    </div>
  );
}

export default App;
