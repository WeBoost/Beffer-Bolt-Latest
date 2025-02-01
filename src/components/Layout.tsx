import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Home, LogOut, Menu, Plus, X, Globe, ChevronDown, Users2, Settings, HelpCircle, ShoppingCart, LayoutGrid, PenTool as Tool } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Templates', href: '/templates', icon: LayoutGrid },
    { name: 'Pricing', href: '/pricing', icon: ShoppingCart },
    ...(user ? [
      { name: 'Dashboard', href: '/dashboard', icon: Building2 },
      { name: 'Launch Site', href: '/launch', icon: Plus },
      { name: 'Door Configurator', href: '/configure', icon: Tool }
    ] : [])
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top bar */}
      <div className="w-full bg-slate-800/50 text-slate-300 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <Globe size={14} />
              English
              <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              GBP
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/help" className="hover:text-white transition-colors flex items-center gap-1">
              <HelpCircle size={14} />
              Help Center
            </Link>
            {user && (
              <Link to="/settings" className="hover:text-white transition-colors flex items-center gap-1">
                <Settings size={14} />
                Settings
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full bg-slate-900/90 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src="/logo.svg" alt="Beffer" className="h-8" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 text-slate-300">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center gap-2 hover:text-white transition-colors ${
                      location.pathname === item.href ? 'text-white' : ''
                    }`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/settings"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Settings size={20} />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-slate-900 z-50 lg:hidden">
          <div className="p-4 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Beffer" className="h-8" />
            </div>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="text-white" />
            </button>
          </div>
          <nav className="p-4 flex flex-col gap-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-slate-300 py-2 hover:text-white flex items-center gap-2 ${
                    location.pathname === item.href ? 'text-white' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="text-slate-300 py-2 hover:text-white flex items-center gap-2"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="w-full">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/templates" className="text-slate-400 hover:text-white transition-colors">Templates</Link></li>
                <li><Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/roadmap" className="text-slate-400 hover:text-white transition-colors">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/docs" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/guides" className="text-slate-400 hover:text-white transition-colors">Guides</Link></li>
                <li><Link to="/api" className="text-slate-400 hover:text-white transition-colors">API Reference</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/security" className="text-slate-400 hover:text-white transition-colors">Security</Link></li>
                <li><Link to="/cookies" className="text-slate-400 hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <img src="/logo.svg" alt="Beffer" className="h-8" />
              </Link>
              <span className="text-slate-400">© 2024 Beffer. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}