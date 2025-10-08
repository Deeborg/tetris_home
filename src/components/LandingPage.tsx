import React, { useEffect, useRef, useState } from "react";
import PillToggle from "./PillToggle";
import { initTetris as initAutoTetris } from "../game/tetris_auto";
import { initTetris as initManualTetris } from "../game/tetris_manual";
import "./LandingPage.css";

// A type for the Tetris instance to help with cleanup
interface TetrisInstance {
  bgCanvas?: HTMLCanvasElement;
  fgCanvas?: HTMLCanvasElement;
  destroy?: () => void; // We will add this method to tetris_manual.js
}

interface LandingPageProps {
  onNavigateToDataPipeline: () => void;
  onGoBack?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToDataPipeline,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // State to track if the manual game has started
  const [isGameStarted, setIsGameStarted] = useState(false);
  // Ref to hold the current tetris instances for cleanup
  const tetrisInstancesRef = useRef<TetrisInstance[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Cleanup previous instances before creating new ones ---
    tetrisInstancesRef.current.forEach((inst) => {
      try {
        inst.bgCanvas?.remove();
        inst.fgCanvas?.remove();
        // Call destroy method if it exists (for manual game)
        if (inst.destroy) {
          inst.destroy();
        }
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    });
    tetrisInstancesRef.current = []; // Clear the array

    // --- Initialize the correct game mode ---
    if (isGameStarted) {
      // If game has started, initialize the MANUAL version
      tetrisInstancesRef.current = initManualTetris(container, 1);
    } else {
      // Otherwise, show the AUTOMATIC version as a background
      tetrisInstancesRef.current = initAutoTetris(container, 1);
    }

    // This is the main cleanup function that runs when the component is unmounted
    return () => {
      tetrisInstancesRef.current.forEach((inst) => {
        try {
          inst.bgCanvas?.remove();
          inst.fgCanvas?.remove();
          if (inst.destroy) {
            inst.destroy();
          }
        } catch (e) {
          // Ignore cleanup errors on unmount
        }
      });
    };
  }, [isGameStarted]); // This effect re-runs whenever isGameStarted changes

  return (
    <div className="landing-page">
      <div className="landing-background">
        <div className="stars"></div>
        <div className="comets"></div>
      </div>

      <PillToggle onToggle={onNavigateToDataPipeline} isRed={false} />

      {/* Tetris Game Container */}
      <div ref={containerRef} className="tetris-container" />

      {/* Show the "Play" button only when the manual game hasn't started */}
      {!isGameStarted && (
        <div className="play-button-overlay">
          <button className="play-button" onClick={() => setIsGameStarted(true)}>
            
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;