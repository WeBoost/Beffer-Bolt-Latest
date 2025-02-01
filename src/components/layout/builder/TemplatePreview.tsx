import React from 'react';
import { Eye, Code, Copy, Download } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  previewUrl: string;
  category: string;
  features: string[];
}

interface TemplatePreviewProps {
  template: Template;
  onUse: () => void;
  onViewCode: () => void;
  onClone: () => void;
  onExport: () => void;
}

export function TemplatePreview({
  template,
  onUse,
  onViewCode,
  onClone,
  onExport
}: TemplatePreviewProps) {
  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h2>
        <p className="text-gray-600 mb-4">{template.description}</p>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {template.category}
          </span>
        </div>
      </div>

      <div className="aspect-video relative group">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a
            href={template.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Eye size={20} />
            Live Preview
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-medium text-gray-900 mb-4">Features</h3>
        <ul className="space-y-2 mb-6">
          {template.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-green-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={onUse}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Use Template
          </button>
          <button
            onClick={onViewCode}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Code size={20} />
          </button>
          <button
            onClick={onClone}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Copy size={20} />
          </button>
          <button
            onClick={onExport}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}