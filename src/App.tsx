import './App.css'

function App() {
  return (
    <div className="container">
      <picture>
        {/* Desktop: 1920x1080 */}
        <source media="(min-width: 1025px)" srcSet="/gifs/desktop.gif" />
        {/* iPad: 1080x1080 (assuming 768px to 1024px for tablet) */}
        <source media="(min-width: 768px) and (max-width: 1024px)" srcSet="/gifs/ipad.gif" />
        {/* Mobile: 1080x1920 */}
        <img src="/gifs/mobile.gif" alt="Wifi GIF" className="fullscreen-gif" />
      </picture>
    </div>
  )
}

export default App
