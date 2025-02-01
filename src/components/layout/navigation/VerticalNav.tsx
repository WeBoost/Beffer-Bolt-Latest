import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, LayoutDashboard, ShoppingBag, Settings, Users, BarChart2, FileText, HelpCircle } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface VerticalNavProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function VerticalNav({ collapsed = false, onToggle }: VerticalNavProps) {
  const location = useLocation();
  
  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', href: '/orders', icon: <ShoppingBag size={20} />, badge: '5' },
    { name: 'Customers', href: '/customers', icon: <Users size={20} /> },
    { name: 'Analytics', href: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Documents', href: '/documents', icon: <FileText size={20} /> },
    { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
    { name: 'Help', href: '/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <nav className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && <span className="text-xl font-bold text-gray-900">Admin</span>}
          <button
            onClick={onToggle}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              collapsed ? 'mx-auto' : ''
            }`}
          >
            <ChevronRight
              size={20}
              className={`transform transition-transform ${
                collapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center ${
                collapsed ? 'justify-center' : 'justify-between'
              } px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </div>
              {!collapsed && item.badge && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}