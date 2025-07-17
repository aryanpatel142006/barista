import { useEffect, useState } from 'react'
import './App.css'
import BaristaForm from "./components/baristaForm"
import grindLogo from "./assets/5895213.png"

function App() {
  const [highlight, setHighlight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setHighlight(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="root">
      <div className="title-container" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", textAlign: "left" }}>
        <img
          src={grindLogo}
          alt="Grind Logo"
          style={{
            width: "120px", 
            height: "120px",
            marginRight: "22px",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(138, 98, 12, 0.18)"
          }}
        />
        <div>
          <h1 className="title" style={{ marginBottom: "0.2em" }}>On My Grind</h1>
          <p
            className={`subtitle${highlight ? " subtitle-highlight" : ""}`}
            style={{
              transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
              fontSize: highlight ? "2rem" : "1.15rem",
              fontWeight: highlight ? "700" : "400",
              color: highlight ? "#8a620c" : "#3d2c0f",
              background: highlight ? "#fffbe6" : "none",
              padding: highlight ? "0.5em 1em" : "0",
              borderRadius: highlight ? "12px" : "0",
              boxShadow: highlight ? "0 2px 8px rgba(138, 98, 12, 0.12)" : "none"
            }}
          >
            "So you think you can barista? Let's put that to the test..."
          </p>
        </div>
      </div>
      <BaristaForm />
    </div>
  )
}

export default App
