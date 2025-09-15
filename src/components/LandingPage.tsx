import React, { useEffect, useRef } from "react";
import PillToggle from "./PillToggle";
import { initTetris } from "../game/tetris";
import "./LandingPage.css";

interface LandingPageProps {
  onNavigateToDataPipeline: () => void;
  onGoBack?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToDataPipeline,
  onGoBack,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const instances = initTetris(container, 1); // 1 board
      return () => {
        instances.forEach((inst) => {
          try {
            inst.bgCanvas?.remove();
            inst.fgCanvas?.remove();
          } catch (e) {
            // Ignore cleanup errors
          }
        });
      };
    }
  }, []);

  return (
    <div className="landing-page">
      <div className="landing-background">
        <div className="stars"></div>
        <div className="comets"></div>
      </div>

      {/* Pill Toggle - now navigates to DataPipeline */}
      <PillToggle onToggle={onNavigateToDataPipeline} isRed={false} />

      {/* Tetris Game Container */}
      <div ref={containerRef} className="tetris-container" />

      <div className="welcome-message">
        {/* <h1>Welcome to AJA Labs</h1>
        <p>Explore our innovative projects and products.</p> */}
      </div>
    </div>
  );
};

export default LandingPage;
