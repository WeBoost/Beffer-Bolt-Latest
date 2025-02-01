import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface MinimalHeaderProps {
  logo?: string;
  companyName?: string;
  transparent?: boolean;
}

export function MinimalHeader({ logo, companyName = 'Door Company', transparent = false }: MinimalHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth();

  const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'Configure', href: '/configure' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`w-full ${transparent ? 'absolute top-0 left-0 z-50' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {logo ? (
              <img src={logo} alt={companyName} className="h-8" />
            ) : (
              <span className={`text-xl font-bold ${transparent ? 'text-white' : 'text-gray-900'}`}>
                {companyName}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium ${
                  transparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/cart"
              className={`p-2 rounded-full ${
                transparent
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              } transition-colors`}
            >
              <ShoppingCart size={20} />
            </Link>
            <Link
              to={user ? '/account' : '/login'}
              className={`p-2 rounded-full ${
                transparent
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              } transition-colors`}
            >
              <User size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-full ${
              transparent
                ? 'text-white/90 hover:text-white hover:bg-white/10'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            } transition-colors`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              <Link
                to="/cart"
                className="py-2 flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                Cart
              </Link>
              <Link
                to={user ? '/account' : '/login'}
                className="py-2 flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                {user ? 'Account' : 'Sign In'}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}