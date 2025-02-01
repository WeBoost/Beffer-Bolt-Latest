import React from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

interface OrderTimelineProps {
  events: TimelineEvent[];
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  const getStatusIcon = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'pending':
        return Package;
      case 'processing':
        return Clock;
      case 'shipped':
        return Truck;
      case 'delivered':
        return CheckCircle;
      default:
        return Package;
    }
  };

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'pending':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => {
          const Icon = getStatusIcon(event.status);
          const colorClass = getStatusColor(event.status);

          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full ${colorClass} flex items-center justify-center ring-8 ring-white`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-gray-600">{event.description}</p>
                      {event.location && (
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                          {event.location}
                        </div>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <div>{event.date}</div>
                      <div>{event.time}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}