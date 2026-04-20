import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import './index.css';
import illustration from './assets/illustration.png';
import logo from './assets/logo-official.svg';

function App() {

  const loginAruba = () => {
    const params = new URLSearchParams(window.location.search);
    const u = params.get('u');
    const form = document.getElementById('aruba-login-form') as HTMLFormElement;
    const urlInput = document.getElementById('original-url') as HTMLInputElement;

    if (u && urlInput) {
      urlInput.value = u;
    }
    
    if (form) {
      form.submit();
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
          action="https://securelogin.arubanetworks.com/cgi-bin/login" 
          style={{ width: '100%' }}
        >
          <input type="hidden" name="user" value="guest" />
          <input type="hidden" name="password" value="guest" />
          <input type="hidden" name="cmd" value="authenticate" />
          <input type="hidden" name="url" id="original-url" value="" />

          <button 
            type="button" 
            id="btn-connect" 
            className="connect-button" 
            onClick={loginAruba}
            style={{ width: '100%', padding: '15px', background: '#e31a1a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
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
