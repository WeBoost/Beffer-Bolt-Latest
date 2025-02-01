import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Settings, CreditCard, Bell, ShoppingBag, ArrowRight } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
}

interface AccountOverviewProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  recentOrders: Order[];
}

export function AccountOverview({ user, recentOrders }: AccountOverviewProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center gap-4 mb-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl font-semibold text-blue-600">
                {user.name[0]}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, {user.name}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/account/orders"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Package className="mb-2 text-gray-600" size={24} />
            <h3 className="font-medium text-gray-900">Orders</h3>
            <p className="text-sm text-gray-600">View your order history</p>
          </Link>
          <Link
            to="/account/subscriptions"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Clock className="mb-2 text-gray-600" size={24} />
            <h3 className="font-medium text-gray-900">Subscriptions</h3>
            <p className="text-sm text-gray-600">Manage your plans</p>
          </Link>
          <Link
            to="/account/settings"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="mb-2 text-gray-600" size={24} />
            <h3 className="font-medium text-gray-900">Settings</h3>
            <p className="text-sm text-gray-600">Update your preferences</p>
          </Link>
          <Link
            to="/account/billing"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <CreditCard className="mb-2 text-gray-600" size={24} />
            <h3 className="font-medium text-gray-900">Billing</h3>
            <p className="text-sm text-gray-600">View payment history</p>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link
            to="/account/orders"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <ShoppingBag className="text-gray-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">${order.total.toFixed(2)}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <Link
            to="/account/notifications"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Settings
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
            <Bell className="text-blue-600 shrink-0" size={20} />
            <div>
              <p className="font-medium text-blue-900">
                Your order #12345 has been shipped
              </p>
              <p className="text-sm text-blue-700">
                Track your order to see the delivery status
              </p>
              <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}