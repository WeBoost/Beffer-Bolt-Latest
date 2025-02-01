import React from 'react';
import { DoorConfiguration } from '../../types/door';
import { Package, Check, Minus, Info } from 'lucide-react';

interface DoorComparisonProps {
  doors: DoorConfiguration[];
  onRemove: (index: number) => void;
  onClose: () => void;
  onGeneratePDF: () => void;
}

export function DoorComparison({
  doors,
  onRemove,
  onClose,
  onGeneratePDF
}: DoorComparisonProps) {
  const features = [
    'Door Type',
    'Installation',
    'Width',
    'Height',
    'Thickness',
    'Material',
    'Finish',
    'Hardware',
    'Glass',
    'Extras'
  ];

  const getFeatureValue = (door: DoorConfiguration, feature: string) => {
    switch (feature) {
      case 'Door Type':
        return door.doorType === 'single' ? 'Single Door' : 'Double Door';
      case 'Installation':
        return door.requiresInstallation ? 'Yes' : 'No';
      case 'Width':
        return `${door.width}"`;
      case 'Height':
        return `${door.height}"`;
      case 'Thickness':
        return `${door.thickness}"`;
      case 'Material':
        return door.material;
      case 'Finish':
        return door.finish;
      case 'Hardware':
        return door.hardware;
      case 'Glass':
        return door.glass || 'None';
      case 'Extras':
        return door.extras.length > 0 ? door.extras.join(', ') : 'None';
      default:
        return '-';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Door Comparison</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-600">
            Compare up to 4 door configurations side by side
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Feature
                </th>
                {doors.map((door, index) => (
                  <th key={index} className="px-6 py-4 min-w-[250px]">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        Door {index + 1}
                      </span>
                      <button
                        onClick={() => onRemove(index)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {features.map((feature) => (
                <tr key={feature} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {feature}
                  </td>
                  {doors.map((door, index) => (
                    <td key={index} className="px-6 py-4">
                      {getFeatureValue(door, feature)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onGeneratePDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Download Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}