import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Clock,
  Award
} from 'lucide-react';

interface EcommerceFooterProps {
  logo?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export function EcommerceFooter({
  logo,
  companyName = 'Door Company',
  phone = '(555) 123-4567',
  email = 'sales@example.com',
  address = '123 Door Street, City, Country'
}: EcommerceFooterProps) {
  const currentYear = new Date().getFullYear();

  const features = [
    { icon: CreditCard, title: 'Secure Payment', description: 'All major cards accepted' },
    { icon: Truck, title: 'Fast Delivery', description: 'Free shipping on orders over $1000' },
    { icon: ShieldCheck, title: 'Warranty', description: '10-year guarantee' },
    { icon: Clock, title: 'Support', description: '24/7 customer service' },
    { icon: Award, title: 'Quality', description: 'ISO 9001 certified' }
  ];

  const navigation = {
    shop: [
      { name: 'All Doors', href: '/products' },
      { name: 'New Arrivals', href: '/products/new' },
      { name: 'Best Sellers', href: '/products/best-sellers' },
      { name: 'Sale', href: '/products/sale' },
      { name: 'Custom Orders', href: '/custom' }
    ],
    account: [
      { name: 'My Account', href: '/account' },
      { name: 'Order History', href: '/account/orders' },
      { name: 'Wish List', href: '/account/wishlist' },
      { name: 'Track Order', href: '/account/track' },
      { name: 'Returns', href: '/account/returns' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns Policy', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Store Locator', href: '/stores' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  };

  return (
    <footer className="bg-white">
      {/* Features */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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

              {/* Newsletter */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Subscribe for Updates
                </h3>
                <p className="text-gray-600 mb-4">
                  Get exclusive offers and the latest product updates.
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

            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
              <ul className="space-y-3">
                {navigation.shop.map((item) => (
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
              <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
              <ul className="space-y-3">
                {navigation.account.map((item) => (
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
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              © {currentYear} {companyName}. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              {navigation.company.map((item) => (
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
      </div>
    </footer>
  );
}