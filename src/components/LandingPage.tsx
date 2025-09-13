import React, { useEffect, useRef } from "react";
import PillToggle from "./PillToggle";
import AboutAjaLabs from "./AboutAjaLabs";
import { initTetris } from "../game/tetris";
import "./LandingPage.css";

interface LandingPageProps {
  onToggle: () => void;
  isRed: boolean;
  onNavigateToUniverse: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onToggle,
  isRed,
  onNavigateToUniverse,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRed && containerRef.current) {
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
  }, [isRed]);

  return (
    <div className="landing-page">
      <div className="landing-background">
        <div className="stars"></div>
        <div className="comets"></div>
      </div>

      {/* Pill Toggle */}
      <PillToggle onToggle={onToggle} isRed={isRed} />

      {/* Tetris Game Container */}
      {!isRed && <div ref={containerRef} className="tetris-container" />}

      {/* Show AboutAjaLabs when toggle is red */}

      {isRed ? (
        <AboutAjaLabs onNavigateToUniverse={onNavigateToUniverse} />
      ) : (
        <div className="welcome-message">
          {/* <h1>Welcome to AJA Labs</h1>
          <p>Explore our innovative projects and products.</p> */}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
