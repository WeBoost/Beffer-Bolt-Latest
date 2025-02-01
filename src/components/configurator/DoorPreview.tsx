import React from 'react';
import { DoorVisualization2D } from './DoorVisualization2D';
import { DoorVisualization3D } from './DoorVisualization3D';

interface DoorPreviewProps {
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
  mode?: '2d' | '3d';
  subscriptionTier?: 'basic' | 'premium' | 'enterprise';
}

export function DoorPreview({ config, mode = '2d', subscriptionTier = 'basic' }: DoorPreviewProps) {
  const canUse3D = subscriptionTier !== 'basic';

  return (
    <div className="w-full h-full">
      {mode === '2d' || !canUse3D ? (
        <DoorVisualization2D config={config} />
      ) : (
        <DoorVisualization3D config={config} />
      )}
    </div>
  );
}