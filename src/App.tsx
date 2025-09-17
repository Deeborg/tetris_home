// src/App.tsx

import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import AjaUniverse from "./components/AjaUniverse";
import DataPipelineProblem from "./components/DataPipelineProblem";
import AboutAjaLabs from "./components/AboutAjaLabs";
import "./App.css";
import logo from "./assets/altexlogowhite.png";


function App() {
  const [currentPage, setCurrentPage] = useState<"game" | "dataPipeline" | "aboutAja" | "universe">(
    "game"
  );

  const handleNavigateToGame = () => {
    setCurrentPage("game");
  };

  const handleNavigateToDataPipeline = () => {
    setCurrentPage("dataPipeline");
  };

  const handleNavigateToAboutAja = () => {
    setCurrentPage("aboutAja");
  };

  const handleNavigateToUniverse = () => {
    setCurrentPage("universe");
  };

  const handleGoBack = () => {
    if (currentPage === "aboutAja" || currentPage === "universe") {
      setCurrentPage("dataPipeline");
    } else if (currentPage === "dataPipeline") {
      setCurrentPage("game");
    }
  };

  return (
    <div className="App">
      {/* ALTEX Logo - Home Button */}
      <div className="logo-container" onClick={handleNavigateToGame} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="ALTEX" className="logo" />
      </div>

      {currentPage === "game" ? (
        <LandingPage
          onNavigateToDataPipeline={handleNavigateToDataPipeline}
          onGoBack={handleGoBack}
        />
      ) : currentPage === "dataPipeline" ? (
        <DataPipelineProblem 
          onNavigateToAboutAja={handleNavigateToAboutAja}
          onNavigateToUniverse={handleNavigateToUniverse}
          onGoBack={handleGoBack}
        />
      ) : currentPage === "aboutAja" ? (
        <AboutAjaLabs 
          onGoBack={handleGoBack}
        />
      ) : (
        <AjaUniverse 
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
}

export default App;
