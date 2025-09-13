import React, { useState, useRef, useEffect } from "react";
import "./PillToggle.css";

const chars =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%&*+";

interface PillToggleProps {
  onToggle: () => void;
  isRed: boolean;
}

export default function PillToggle({ onToggle, isRed }: PillToggleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hover, setHover] = useState(false);
  const fontSize = 12;
  const width = 100;
  const height = 44;
  const columns = Math.floor(width / fontSize);
  const drops = useRef<number[]>(Array(columns).fill(1));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    function drawMatrix() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(34,34,34,0.25)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + "px monospace";
      ctx.fillStyle = "#00FF41";

      for (let i = 0; i < drops.current.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops.current[i] * fontSize);

        if (drops.current[i] * fontSize > height && Math.random() > 0.975) {
          drops.current[i] = 0;
        }
        drops.current[i]++;
      }

      animationId = requestAnimationFrame(drawMatrix);
    }

    drawMatrix();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="pill-toggle-container">
      <div className="pill-tooltip">
        {isRed ? "Business as Usual" : "See What's Really Happening"}
      </div>
      <div
        className={`pill-toggle${isRed ? " red" : ""}`}
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <canvas
          className="matrix-canvas"
          ref={canvasRef}
          width={width}
          height={height}
        />
        <div className="pill-ball"></div>
      </div>
    </div>
  );
}
