import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {user ? (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Your Sites</h2>
            <p className="text-gray-500">No sites created yet. Launch your first site to get started!</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Subscription Status</h2>
            <p className="text-gray-500">No active subscriptions</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please sign in to view your dashboard.</p>
      )}
    </div>
  );
}