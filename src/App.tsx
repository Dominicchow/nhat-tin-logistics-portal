import { useState } from 'react'
import './App.css'

function App() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      const params = window.location.search
      // Chuyển sang accept.html để Aruba thực hiện xác thực (Acknowledge)
      window.location.href = '/accept.html' + params
    }, 400)
  }

  return (
    <div className="container" onClick={handleConnect} style={{ cursor: 'pointer' }}>
      <picture>
        {/* Desktop: 1920x1080 */}
        <source media="(min-width: 1025px)" srcSet="/gifs/desktop.gif" />
        {/* iPad: 1080x1080 */}
        <source media="(min-width: 768px) and (max-width: 1024px)" srcSet="/gifs/ipad.gif" />
        {/* Mobile: 1080x1920 */}
        <img src="/gifs/mobile.gif" alt="Wifi GIF" className="fullscreen-gif" />
      </picture>
      
      <div className="overlay-text">
        {isConnecting ? '⏳ Đang kết nối...' : 'Chạm để truy cập Wi-Fi'}
      </div>
    </div>
  )
}

export default App
