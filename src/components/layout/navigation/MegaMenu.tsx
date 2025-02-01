import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface MegaMenuItem {
  name: string;
  description?: string;
  href: string;
  image?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

interface MegaMenuProps {
  trigger: React.ReactNode;
  sections: MegaMenuSection[];
  featured?: MegaMenuItem[];
}

export function MegaMenu({ trigger, sections, featured }: MegaMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative group" onMouseLeave={() => setIsOpen(false)}>
      <button
        className="flex items-center gap-1 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        {trigger}
        <ChevronDown size={16} className={`transform transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-7xl bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="grid grid-cols-4 gap-8 p-8">
            {/* Main sections */}
            <div className="col-span-3 grid grid-cols-3 gap-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="group/item flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                          <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </Link>
                        {item.description && (
                          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured section */}
            {featured && (
              <div className="col-span-1 bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Featured</h3>
                <div className="space-y-6">
                  {featured.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block group"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.image && (
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h4>
                      {item.description && (
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}