import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerSection {
  title: string;
  items: {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sections: DrawerSection[];
}

export function MobileDrawer({ isOpen, onClose, sections }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl z-50"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-64px)]">
              {sections.map((section) => (
                <div key={section.title} className="p-4 border-b">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center justify-between py-2 text-gray-700 hover:text-gray-900 transition-colors"
                        onClick={onClose}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}