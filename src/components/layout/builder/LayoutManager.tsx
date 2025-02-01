import React from 'react';
import { Layout, Move, Plus, Settings, Copy, Trash2, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface Section {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  children?: Section[];
}

interface LayoutManagerProps {
  sections: Section[];
  onReorder: (startIndex: number, endIndex: number) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onAddSection: () => void;
}

export function LayoutManager({
  sections,
  onReorder,
  onToggleVisibility,
  onDuplicate,
  onDelete,
  onEdit,
  onAddSection
}: LayoutManagerProps) {
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    onReorder(sourceIndex, targetIndex);
  };

  return (
    <div className="h-full flex flex-col bg-white border-l">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Layout Manager</h2>
          <button
            onClick={onAddSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Section
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {sections.map((section, index) => (
            <div
              key={section.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="bg-white rounded-lg border hover:border-gray-300 transition-colors"
            >
              <div className="p-4 flex items-center gap-4">
                <Move className="text-gray-400 cursor-move" size={20} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Layout size={16} className="text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="text-sm text-gray-500">{section.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleVisibility(section.id)}
                    className={`p-1 rounded transition-colors ${
                      section.visible
                        ? 'text-blue-600 hover:bg-blue-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(section.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={() => onDuplicate(section.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(section.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {section.children && section.children.length > 0 && (
                <div className="border-t px-4 py-2 bg-gray-50">
                  <div className="pl-8 space-y-2">
                    {section.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center gap-4 p-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        <Layout size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {child.name}
                        </span>
                        <div className="flex-1" />
                        <button
                          onClick={() => onToggleVisibility(child.id)}
                          className={`p-1 rounded transition-colors ${
                            child.visible
                              ? 'text-blue-600 hover:bg-blue-50'
                              : 'text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}