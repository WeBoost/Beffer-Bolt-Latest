import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SimpleFooterProps {
  logo?: string;
  companyName?: string;
}

export function SimpleFooter({ logo, companyName = 'Door Company' }: SimpleFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo/Company Name */}
          <Link to="/" className="flex items-center">
            {logo ? (
              <img src={logo} alt={companyName} className="h-8" />
            ) : (
              <span className="text-xl font-bold text-gray-900">{companyName}</span>
            )}
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          © {currentYear} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}