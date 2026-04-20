import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {
  const handleConnect = () => {
    // 1. Tìm xem Aruba có gửi kèm tham số "u" trên thanh địa chỉ không
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('u');

    if (redirectUrl) {
      // 2. Nếu có, chuyển hướng trình duyệt đến địa chỉ đó kèm lệnh chấp nhận
      // Lưu ý: Aruba Instant On thường yêu cầu thêm "?accept=true"
      window.location.href = redirectUrl + (redirectUrl.includes('?') ? '&' : '?') + 'accept=true';
    } else {
      // Trường hợp đang test web bình thường mà không qua Wi-Fi Aruba
      alert("Không tìm thấy tham số xác thực từ Aruba. Vui lòng test khi đang kết nối Wi-Fi Guest.");
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

        <button className="connect-button" onClick={handleConnect}>
          Kết nối Internet
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
