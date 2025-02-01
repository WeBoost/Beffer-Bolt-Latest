import React, { useState } from 'react';
import { Save, Download, Share2, ShoppingCart, ArrowLeft, ArrowRight, Undo, Redo } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
}

interface Style {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
}

interface Hardware {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
}

interface Glass {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
}

interface ConfiguratorProps {
  materials: Material[];
  styles: Style[];
  hardware: Hardware[];
  glass: Glass[];
  onSave: (config: any) => void;
  onAddToCart: (config: any) => void;
}

export function DoorConfigurator({
  materials,
  styles,
  hardware,
  glass,
  onSave,
  onAddToCart
}: ConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    style: '',
    material: '',
    hardware: '',
    glass: '',
    dimensions: {
      width: 36,
      height: 80,
      thickness: 1.75
    }
  });

  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = (newConfig: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newConfig);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setConfig(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setConfig(history[historyIndex + 1]);
    }
  };

  const updateConfig = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    addToHistory(newConfig);
  };

  const calculatePrice = () => {
    let total = 0;
    if (config.style) {
      total += styles.find(s => s.id === config.style)?.price || 0;
    }
    if (config.material) {
      total += materials.find(m => m.id === config.material)?.price || 0;
    }
    if (config.hardware) {
      total += hardware.find(h => h.id === config.hardware)?.price || 0;
    }
    if (config.glass) {
      total += glass.find(g => g.id === config.glass)?.price || 0;
    }
    return total;
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Preview Panel */}
      <div className="w-2/3 bg-gray-100 p-6">
        <div className="h-full flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <Undo size={20} />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <Redo size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSave(config)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Save size={20} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Download size={20} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* 3D Preview */}
          <div className="flex-1 bg-white rounded-lg shadow-inner">
            {/* 3D rendering would go here */}
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              3D Preview
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="w-1/3 border-l">
        <div className="h-full flex flex-col">
          {/* Steps */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Door Configuration</h2>
              <div className="text-sm text-gray-600">
                Step {step} of 4
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full ${
                    s <= step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Configuration Options */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-medium text-gray-900">Choose Style</h3>
                <div className="grid grid-cols-2 gap-4">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => updateConfig('style', style.id)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        config.style === style.id
                          ? 'border-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={style.thumbnail}
                        alt={style.name}
                        className="w-full aspect-square object-cover rounded mb-2"
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {style.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${style.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-medium text-gray-900">Select Material</h3>
                <div className="grid grid-cols-2 gap-4">
                  {materials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => updateConfig('material', material.id)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        config.material === material.id
                          ? 'border-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={material.thumbnail}
                        alt={material.name}
                        className="w-full aspect-square object-cover rounded mb-2"
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {material.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${material.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-medium text-gray-900">Hardware Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  {hardware.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => updateConfig('hardware', item.id)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        config.hardware === item.id
                          ? 'border-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full aspect-square object-cover rounded mb-2"
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="font-medium text-gray-900">Dimensions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (inches)
                    </label>
                    <input
                      type="number"
                      value={config.dimensions.width}
                      onChange={(e) =>
                        updateConfig('dimensions', {
                          ...config.dimensions,
                          width: parseFloat(e.target.value),
                        })
                      }
                      min="24"
                      max="48"
                      step="0.25"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (inches)
                    </label>
                    <input
                      type="number"
                      value={config.dimensions.height}
                      onChange={(e) =>
                        updateConfig('dimensions', {
                          ...config.dimensions,
                          height: parseFloat(e.target.value),
                        })
                      }
                      min="60"
                      max="96"
                      step="0.25"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thickness (inches)
                    </label>
                    <input
                      type="number"
                      value={config.dimensions.thickness}
                      onChange={(e) =>
                        updateConfig('dimensions', {
                          ...config.dimensions,
                          thickness: parseFloat(e.target.value),
                        })
                      }
                      min="1.375"
                      max="2.25"
                      step="0.125"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600">Total Price</div>
                <div className="text-2xl font-bold">${calculatePrice().toFixed(2)}</div>
              </div>
              <button
                onClick={() => onAddToCart(config)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                disabled={step === 4}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                Next
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}