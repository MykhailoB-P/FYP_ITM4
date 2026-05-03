"use client";

import { useEffect, useRef } from "react";

export default function LiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let timeoutId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    // The grid spacing is 24px (from globals.css bg-dot-pattern)
    const gridSize = 24;

    const drawLightning = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly decide if we draw lightning this frame
      const numLines = Math.floor(Math.random() * 2) + 2; // 2 to 3 lines
      
      ctx.beginPath();
      ctx.strokeStyle = "#00FF00"; // Success Green lightning
      ctx.lineWidth = 2;

      for (let i = 0; i < numLines; i++) {
        // Pick a random dot
        let startX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        let startY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        
        ctx.moveTo(startX, startY);

        // Draw erratic path
        let currentX = startX;
        let currentY = startY;
        const segments = Math.floor(Math.random() * 5) + 3; // 3 to 7 segments
        
        for (let j = 0; j < segments; j++) {
          const dx = (Math.floor(Math.random() * 5) - 2) * gridSize;
          const dy = (Math.floor(Math.random() * 5) - 2) * gridSize;
          currentX += dx;
          currentY += dy;
          ctx.lineTo(currentX, currentY);
        }
      }
      ctx.stroke();

      // Clear after 200ms
      setTimeout(() => {
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 200);

      // Schedule next lightning (10 to 15 seconds)
      const nextDelay = Math.random() * 5000 + 10000; 
      timeoutId = setTimeout(drawLightning, nextDelay);
    };

    // Start loop
    timeoutId = setTimeout(drawLightning, Math.random() * 5000 + 5000);

    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
