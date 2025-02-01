import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Phone, Mail, ChevronDown, Search } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface FullHeaderProps {
  logo?: string;
  companyName?: string;
  phone?: string;
  email?: string;
}

export function FullHeader({ 
  logo, 
  companyName = 'Door Company',
  phone = '(555) 123-4567',
  email = 'sales@example.com'
}: FullHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth();

  const navigation = {
    products: [
      { name: 'Interior Doors', href: '/products/interior' },
      { name: 'Exterior Doors', href: '/products/exterior' },
      { name: 'Security Doors', href: '/products/security' },
      { name: 'Fire Rated Doors', href: '/products/fire-rated' },
    ],
    solutions: [
      { name: 'Residential', href: '/solutions/residential' },
      { name: 'Commercial', href: '/solutions/commercial' },
      { name: 'Industrial', href: '/solutions/industrial' },
      { name: 'Custom Projects', href: '/solutions/custom' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ],
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                <Phone size={16} />
                {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                <Mail size={16} />
                {email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/trade" className="hover:text-gray-300 transition-colors">
                Trade Account
              </Link>
              <Link to="/support" className="hover:text-gray-300 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {logo ? (
              <img src={logo} alt={companyName} className="h-10" />
            ) : (
              <span className="text-2xl font-bold text-gray-900">{companyName}</span>
            )}
          </Link>

          {/* Search */}
          <div className="hidden lg:block flex-1 max-w-lg mx-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                Products
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  {navigation.products.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                Solutions
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                Company
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/cart"
              className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart size={20} />
            </Link>
            <Link
              to={user ? '/account' : '/login'}
              className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <User size={20} />
            </Link>
            <Link
              to="/configure"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Configure Door
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <nav className="divide-y divide-gray-200">
              {/* Products */}
              <div className="py-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Products</h3>
                {navigation.products.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Solutions */}
              <div className="py-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Solutions</h3>
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Company */}
              <div className="py-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Company</h3>
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="py-4">
                <Link
                  to="/cart"
                  className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart size={20} />
                  Cart
                </Link>
                <Link
                  to={user ? '/account' : '/login'}
                  className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  {user ? 'Account' : 'Sign In'}
                </Link>
                <Link
                  to="/configure"
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Configure Door
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}