import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Dressup from './Dressup';

const SignIn = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const redirectToBarbieGiydirme = () => {
    navigate('/dress-up');
  };

  return (
    <div className="app-container">
      {/* Butonları yan yana hizala */}
      <div className="button-group">
        <button className="styled-button" onClick={redirectToBarbieGiydirme}>
          Build-Jelly
        </button>
        
        <button className="styled-button" onClick={() => setShowModal(true)}>
          Future Game
        </button>
      </div>

      {/* Dönen çember */}
   <div className="wallet-portal">
  <div className="rotating-circle">
    <img src="/images/backside.gif" alt="Rotating Circle" className="circle-img" />
  </div>
</div>


      {/* Sosyal medya linkleri */}
      <div className="social-media-links">
        <a href="https://x.com/PortaltoBitcoin" target="_blank" rel="noopener noreferrer">
          <img src="/images/twitterlogo.png" alt="Twitter" className="social-icon" />
        </a>
        <a href="https://discord.gg/portaltobitcoin" target="_blank" rel="noopener noreferrer">
          <img src="/images/discordlogo.png" alt="Discord" className="social-icon" />
        </a>
      </div>

      {/* Gelecek oyun açıklaması için modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Coming Soon!</h2>
            <p>A new game is under development. Stay tuned for more updates!</p>
            <button className="clse-button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dress-up" element={<Dressup />} />
      </Routes>
    </Router>
  );
};

export default App;
