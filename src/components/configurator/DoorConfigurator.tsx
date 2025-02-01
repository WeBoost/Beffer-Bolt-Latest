import React, { useState } from 'react';
import { DoorPreview } from './DoorPreview';
import { Package, Ruler, PenTool as Tool, Palette, MapPin, ArrowRight, ArrowLeft, Save, Download, Share2, Plus, Minus, Eye, Box as Box3D, Shield, Flame } from 'lucide-react';

interface DoorConfiguration {
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

export function DoorConfigurator() {
  const [config, setConfig] = useState<DoorConfiguration>({
    doorType: 'single',
    doorPurpose: 'security',
    structuralOpeningWidth: 900,
    structuralOpeningHeight: 2100,
    hingeSide: 'left',
    openingDirection: 'outward',
    marineGrade: false,
    color: 'RAL 7016',
    fireRating: 'none',
    middleLockType: 'lever_sash',
    weathering: false,
    louvrePanels: false,
    visionPanels: 'none'
  });

  const [step, setStep] = useState(1);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Left Panel - Preview */}
      <div className="w-2/3 border-r border-slate-800">
        <div className="h-full flex flex-col">
          {/* Preview Controls */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode('2d')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === '2d'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === '3d'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Box3D size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">
                  <Save size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-6">
            <div className="bg-slate-800/50 rounded-xl h-full flex items-center justify-center border border-slate-700">
              <DoorPreview config={config} mode={viewMode} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Configuration */}
      <div className="w-1/3 flex flex-col">
        {/* Steps Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Configure Your Door</h2>
            <span className="text-sm text-slate-400">Step {step} of 5</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full ${
                  s <= step ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Configuration Form */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Door Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setConfig({ ...config, doorType: 'single' })}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        config.doorType === 'single'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <Package className="mx-auto mb-2 text-slate-400" size={24} />
                      <span className="block text-slate-300">Single Door</span>
                    </button>
                    <button
                      onClick={() => setConfig({ ...config, doorType: 'double' })}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        config.doorType === 'double'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <Package className="mx-auto mb-2 text-slate-400" size={24} />
                      <span className="block text-slate-300">Double Door</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Door Purpose
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setConfig({ ...config, doorPurpose: 'security' })}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        config.doorPurpose === 'security'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <Shield className="mx-auto mb-2 text-slate-400" size={24} />
                      <span className="block text-slate-300">Security Door</span>
                    </button>
                    <button
                      onClick={() => setConfig({ ...config, doorPurpose: 'fire_exit' })}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        config.doorPurpose === 'fire_exit'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <Flame className="mx-auto mb-2 text-slate-400" size={24} />
                      <span className="block text-slate-300">Fire Exit</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-slate-800 bg-slate-800/50">
          <div className="flex justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 text-slate-300 hover:text-white disabled:opacity-50"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <button
              onClick={() => setStep(Math.min(5, step + 1))}
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              Next
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}