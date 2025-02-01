import React from 'react';
import { Scale } from 'lucide-react';

interface CompareButtonProps {
  isSelected: boolean;
  onToggle: () => void;
  selectedCount: number;
  maxProducts?: number;
}

export function CompareButton({
  isSelected,
  onToggle,
  selectedCount,
  maxProducts = 4
}: CompareButtonProps) {
  return (
    <button
      onClick={onToggle}
      disabled={!isSelected && selectedCount >= maxProducts}
      className={`group relative px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
        isSelected
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
      }`}
    >
      <Scale size={20} />
      {isSelected ? 'Remove from Compare' : 'Add to Compare'}
      {selectedCount > 0 && (
        <span className={`px-2 py-0.5 rounded-full text-sm ${
          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}>
          {selectedCount}
        </span>
      )}
      {!isSelected && selectedCount >= maxProducts && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          Maximum {maxProducts} products can be compared
        </div>
      )}
    </button>
  );
}