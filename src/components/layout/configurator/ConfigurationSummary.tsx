import React from 'react';
import { Package, Ruler, PenTool as Tool, Palette } from 'lucide-react';

interface ConfigurationSummaryProps {
  config: {
    style: string;
    material: string;
    hardware: string;
    glass: string;
    dimensions: {
      width: number;
      height: number;
      thickness: number;
    };
  };
  styles: any[];
  materials: any[];
  hardware: any[];
  glass: any[];
}

export function ConfigurationSummary({
  config,
  styles,
  materials,
  hardware,
  glass
}: ConfigurationSummaryProps) {
  const selectedStyle = styles.find(s => s.id === config.style);
  const selectedMaterial = materials.find(m => m.id === config.material);
  const selectedHardware = hardware.find(h => h.id === config.hardware);
  const selectedGlass = glass.find(g => g.id === config.glass);

  const calculateTotal = () => {
    return (
      (selectedStyle?.price || 0) +
      (selectedMaterial?.price || 0) +
      (selectedHardware?.price || 0) +
      (selectedGlass?.price || 0)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Configuration Summary</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Style */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Package className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Door Style</h3>
            <p className="text-gray-600">{selectedStyle?.name || 'Not selected'}</p>
            {selectedStyle && (
              <p className="text-sm text-gray-500 mt-1">
                ${selectedStyle.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Material */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
            <Palette className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Material</h3>
            <p className="text-gray-600">{selectedMaterial?.name || 'Not selected'}</p>
            {selectedMaterial && (
              <p className="text-sm text-gray-500 mt-1">
                ${selectedMaterial.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Hardware */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
            <Tool className="text-emerald-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Hardware</h3>
            <p className="text-gray-600">{selectedHardware?.name || 'Not selected'}</p>
            {selectedHardware && (
              <p className="text-sm text-gray-500 mt-1">
                ${selectedHardware.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Dimensions */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center shrink-0">
            <Ruler className="text-yellow-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Dimensions</h3>
            <div className="space-y-1 text-gray-600">
              <p>Width: {config.dimensions.width} inches</p>
              <p>Height: {config.dimensions.height} inches</p>
              <p>Thickness: {config.dimensions.thickness} inches</p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="pt-6 border-t">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}