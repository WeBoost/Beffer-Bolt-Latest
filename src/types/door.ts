export interface DoorConfiguration {
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
}