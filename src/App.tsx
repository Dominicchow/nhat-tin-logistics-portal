
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const postDomain = urlParams.get('post') || 'captive-2022.aio.cloudauth.net';
  const errmsg     = urlParams.get('errmsg') || urlParams.get('error') || '';

  // "Vòng lặp thần thánh" v2: Relay TẤT CẢ tham số Aruba gửi về, dùng cmd=login
  const hiddenInputs: any[] = [];
  urlParams.forEach((value, key) => {
    // Bỏ qua: post (đã dùng làm action URL), cmd (ta tự set), và các error param
    const skip = ['post', 'cmd', 'errmsg', 'error'];
    if (!skip.includes(key)) {
      hiddenInputs.push(<input key={key} type="hidden" name={key} value={value} />);
    }
  });

  // Hiện toàn bộ URL để debug - tìm params ẩn
  const fullUrl = window.location.href;

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

        {/* Debug: Hiện toàn bộ URL để tìm tất cả tham số Aruba gửi về */}
        <div style={{ fontSize: '9px', background: '#ffebee', padding: '8px', marginBottom: '12px', borderRadius: '5px', textAlign: 'left', color: '#b71c1c', borderLeft: '3px solid #d91500', wordBreak: 'break-all' }}>
          <strong>Debug URL:</strong><br/>
          {fullUrl}<br/>
          {errmsg && <><strong>Lỗi: {errmsg}</strong><br/></>}
          <strong>Tất cả Params:</strong> {(() => {
            const parts: string[] = [];
            urlParams.forEach((v, k) => parts.push(`${k}=${v}`));
            return parts.join(' | ');
          })()}
        </div>

        {/* Gọi Vercel API proxy → proxy POST lên Aruba qua HTTP phía server */}
        <button 
          id="btn-connect" 
          className="connect-button"
          onClick={() => {
            // Đưa TẤT CẢ params vào URL để API proxy xử lý
            const apiParams = new URLSearchParams();
            urlParams.forEach((v, k) => {
              apiParams.set(k, v);
            });
            // HTTPS→HTTPS: không Mixed Content. Vercel server sẽ POST HTTP lên Aruba
            window.location.href = `/api/aruba-login?${apiParams.toString()}`;
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
