import React from 'react';
import { Palette, Type, Layout, Save, Undo, Redo } from 'lucide-react';

interface ThemeCustomizerProps {
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    typography: {
      fontFamily: string;
      fontSize: string;
      lineHeight: string;
    };
    spacing: {
      container: string;
      gutter: string;
    };
  };
  onUpdate: (theme: any) => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export function ThemeCustomizer({
  theme,
  onUpdate,
  onSave,
  onUndo,
  onRedo
}: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = React.useState<'colors' | 'typography' | 'layout'>('colors');

  const handleColorChange = (key: string, value: string) => {
    onUpdate({
      ...theme,
      colors: {
        ...theme.colors,
        [key]: value
      }
    });
  };

  const handleTypographyChange = (key: string, value: string) => {
    onUpdate({
      ...theme,
      typography: {
        ...theme.typography,
        [key]: value
      }
    });
  };

  const handleSpacingChange = (key: string, value: string) => {
    onUpdate({
      ...theme,
      spacing: {
        ...theme.spacing,
        [key]: value
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-white border-l">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Theme Customizer</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onUndo}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Undo size={20} />
            </button>
            <button
              onClick={onRedo}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Redo size={20} />
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'colors'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Palette size={20} />
            Colors
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'typography'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Type size={20} />
            Typography
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'layout'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layout size={20} />
            Layout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-12 h-12 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-12 h-12 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-12 h-12 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-12 h-12 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="w-12 h-12 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                value={theme.typography.fontFamily}
                onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="system-ui">System UI</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Font Size
              </label>
              <select
                value={theme.typography.fontSize}
                onChange={(e) => handleTypographyChange('fontSize', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Line Height
              </label>
              <select
                value={theme.typography.lineHeight}
                onChange={(e) => handleTypographyChange('lineHeight', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1.4">1.4</option>
                <option value="1.5">1.5</option>
                <option value="1.6">1.6</option>
                <option value="1.7">1.7</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Container Width
              </label>
              <select
                value={theme.spacing.container}
                onChange={(e) => handleSpacingChange('container', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1280px">1280px</option>
                <option value="1440px">1440px</option>
                <option value="1600px">1600px</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gutter Width
              </label>
              <select
                value={theme.spacing.gutter}
                onChange={(e) => handleSpacingChange('gutter', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="16px">16px</option>
                <option value="24px">24px</option>
                <option value="32px">32px</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}