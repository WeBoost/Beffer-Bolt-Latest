import React, { useEffect, useRef } from 'react';

interface DoorVisualization2DProps {
  config: {
    doorType: 'single' | 'double';
    doorPurpose: 'security' | 'fire_exit';
    structuralOpeningWidth: number;
    structuralOpeningHeight: number;
    hingeSide: 'left' | 'right';
    openingDirection: 'inward' | 'outward';
    activeSide?: 'left' | 'right';
    marineGrade: boolean;
    color: string;
    fireRating: string;
    middleLockType: string;
    upperLock?: string;
    lowerLock?: string;
    maglock?: string;
    closer?: string;
    spyHole?: boolean;
    kickPlates?: string[];
    weathering: boolean;
    louvrePanels: boolean;
    visionPanels: 'none' | 'master' | 'both';
  };
}

export function DoorVisualization2D({ config }: DoorVisualization2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate door dimensions in pixels
    const scale = Math.min(
      (canvas.width * 0.8) / config.structuralOpeningWidth,
      (canvas.height * 0.8) / config.structuralOpeningHeight
    );
    const doorWidth = config.structuralOpeningWidth * scale;
    const doorHeight = config.structuralOpeningHeight * scale;
    const x = (canvas.width - doorWidth) / 2;
    const y = (canvas.height - doorHeight) / 2;

    // Draw door frame
    ctx.fillStyle = '#4B5563';
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, doorWidth, doorHeight);
    ctx.strokeRect(x, y, doorWidth, doorHeight);

    // Draw vision panel if present
    if (config.visionPanels !== 'none') {
      const panelWidth = doorWidth * 0.6;
      const panelHeight = doorHeight * 0.3;
      const panelX = x + (doorWidth - panelWidth) / 2;
      const panelY = y + doorHeight * 0.3;

      ctx.fillStyle = 'rgba(200, 200, 255, 0.5)';
      ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
      ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
    }

    // Draw hardware
    const handleX = config.hingeSide === 'left' ? x + doorWidth * 0.9 : x + doorWidth * 0.1;
    const handleY = y + doorHeight * 0.5;
    const handleSize = doorWidth * 0.05;

    ctx.fillStyle = '#9CA3AF';
    ctx.beginPath();
    ctx.arc(handleX, handleY, handleSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw hinges
    const hingeX = config.hingeSide === 'left' ? x : x + doorWidth;
    const hingePositions = [0.2, 0.5, 0.8];
    
    hingePositions.forEach(pos => {
      const hingeY = y + doorHeight * pos;
      ctx.fillStyle = '#9CA3AF';
      ctx.beginPath();
      ctx.arc(hingeX, hingeY, handleSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full h-full bg-gray-50 rounded-lg"
    />
  );
}