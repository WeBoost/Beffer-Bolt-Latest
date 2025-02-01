import React from 'react';
import { Package, Truck, CheckCircle, Clock, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface OrderStatus {
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  location?: string;
  description: string;
}

interface OrderTrackerProps {
  orderId: string;
  status: OrderStatus;
  estimatedDelivery: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  carrier?: string;
}

export function OrderTracker({
  orderId,
  status,
  estimatedDelivery,
  shippingAddress,
  trackingNumber,
  carrier
}: OrderTrackerProps) {
  const steps = [
    {
      id: 'pending',
      title: 'Order Placed',
      icon: Package,
      color: 'blue'
    },
    {
      id: 'processing',
      title: 'Processing',
      icon: Clock,
      color: 'yellow'
    },
    {
      id: 'shipped',
      title: 'Shipped',
      icon: Truck,
      color: 'purple'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === status.status);

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Order #{orderId}
          </h2>
          {trackingNumber && (
            <a
              href={`#`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              Track with {carrier}
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            Estimated Delivery: {estimatedDelivery}
          </div>
          {trackingNumber && (
            <div className="flex items-center gap-2">
              <Package size={16} />
              Tracking: {trackingNumber}
            </div>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-6 border-b">
        <div className="relative">
          <div className="absolute top-5 left-[1.3rem] right-[1.3rem] h-0.5 bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`
              }}
            />
          </div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 ${
                      isComplete
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    } ${
                      isCurrent ? 'ring-4 ring-blue-100' : ''
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-600">
                    {step.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Details */}
      <div className="p-6 border-b">
        <h3 className="font-medium text-gray-900 mb-4">Current Status</h3>
        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            {(() => {
              const Icon = steps.find(s => s.id === status.status)?.icon || Package;
              return <Icon className="text-blue-600" size={20} />;
            })()}
          </div>
          <div>
            <p className="font-medium text-blue-900">{status.description}</p>
            <p className="text-sm text-blue-700 mt-1">{status.date}</p>
            {status.location && (
              <div className="flex items-center gap-2 text-sm text-blue-700 mt-2">
                <MapPin size={16} />
                {status.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="p-6">
        <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-900">{shippingAddress.name}</p>
          <p className="text-gray-600 mt-1">{shippingAddress.street}</p>
          <p className="text-gray-600">
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
          </p>
          <p className="text-gray-600">{shippingAddress.country}</p>
        </div>
      </div>
    </div>
  );
}