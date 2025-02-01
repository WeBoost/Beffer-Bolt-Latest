import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FullFooterProps {
  logo?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export function FullFooter({
  logo,
  companyName = 'Door Company',
  phone = '(555) 123-4567',
  email = 'sales@example.com',
  address = '123 Door Street, City, Country'
}: FullFooterProps) {
  const currentYear = new Date().getFullYear();

  const navigation = {
    products: [
      { name: 'Interior Doors', href: '/products/interior' },
      { name: 'Exterior Doors', href: '/products/exterior' },
      { name: 'Security Doors', href: '/products/security' },
      { name: 'Fire Rated Doors', href: '/products/fire-rated' },
      { name: 'Custom Doors', href: '/products/custom' }
    ],
    solutions: [
      { name: 'Residential', href: '/solutions/residential' },
      { name: 'Commercial', href: '/solutions/commercial' },
      { name: 'Industrial', href: '/solutions/industrial' },
      { name: 'Custom Projects', href: '/solutions/custom' },
      { name: 'Door Configurator', href: '/configure' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' }
    ],
    support: [
      { name: 'Contact', href: '/contact' },
      { name: 'Help Center', href: '/help' },
      { name: 'Installation Guides', href: '/guides' },
      { name: 'Returns', href: '/returns' },
      { name: 'Warranty', href: '/warranty' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' }
    ]
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              {logo ? (
                <img src={logo} alt={companyName} className="h-8" />
              ) : (
                <span className="text-xl font-bold text-gray-900">{companyName}</span>
              )}
            </Link>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-start gap-3">
                <Phone size={20} className="shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-gray-900 transition-colors">
                  {phone}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Mail size={20} className="shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-gray-900 transition-colors">
                  {email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0" />
                <span>{address}</span>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-3">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Solutions</h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-b py-8 my-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-gray-900 mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Get the latest updates, news and product offers sent straight to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © {currentYear} {companyName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

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
      </div>
    </footer>
  );
}