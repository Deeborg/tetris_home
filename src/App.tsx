// src/App.tsx

import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import AjaUniverse from "./components/AjaUniverse";
import "./App.css";
import logo from "./assets/ALTEX.png";


function App() {
  const [isRed, setIsRed] = useState(false);
  const [currentPage, setCurrentPage] = useState<"landing" | "universe">(
    "landing"
  );

  const handleToggle = () => {
    setIsRed(!isRed);
  };

  const handleNavigateToUniverse = () => {
    setCurrentPage("universe");
  };

  const handleNavigateToLanding = () => {
    setCurrentPage("landing");
  };

  return (
    <div className="App">
      {/* ALTEX Logo */}
      <div className="logo-container">
        <img src={logo} alt="ALTEX" className="logo" />
      </div>

      {currentPage === "landing" ? (
        <LandingPage
          onToggle={handleToggle}
          isRed={isRed}
          onNavigateToUniverse={handleNavigateToUniverse}
        />
      ) : (
        <AjaUniverse onNavigateToLanding={handleNavigateToLanding} />
      )}
    </div>
  );
}

export default App;
