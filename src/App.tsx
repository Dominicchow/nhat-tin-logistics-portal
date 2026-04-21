
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {
  // Đọc toàn bộ tham số Aruba từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const clientMac = urlParams.get('mac') || '';
  const clientIp  = urlParams.get('ip')  || '';
  const postDomain = urlParams.get('post') || 'captive-2022.aio.cloudauth.net';
  const errmsg = urlParams.get('errmsg') || urlParams.get('error') || '';

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

        {/* Debug Panel */}
        <div style={{ fontSize: '10px', background: '#ffebee', padding: '10px', marginBottom: '15px', borderRadius: '5px', textAlign: 'left', color: '#b71c1c', borderLeft: '3px solid #d91500', wordBreak: 'break-all' }}>
          <strong>Trạng thái kết nối:</strong><br/>
          {errmsg && <><b>Lỗi: {errmsg}</b><br/></>}
          MAC: {clientMac || 'Trống'} | IP: {clientIp || 'Trống'}<br/>
          AP Domain: {postDomain}
        </div>

        {/* Form POST lên Aruba Cloud Auth với cmd=login (Acknowledgment mode) */}
        <form 
          id="aruba-login-form" 
          method="POST" 
          action={`https://${postDomain}/cgi-bin/login`}
          style={{ width: '100%' }}
        >
          {/* cmd=login dành cho Acknowledgment mode (KHÔNG cần user/password) */}
          <input type="hidden" name="cmd" value="login" />
          <input type="hidden" name="mac" value={clientMac} />
          <input type="hidden" name="ip" value={clientIp} />
          <input type="hidden" name="url" value="https://ntlogistics.vn" />

          <button 
            type="submit" 
            id="btn-connect" 
            className="connect-button" 
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
