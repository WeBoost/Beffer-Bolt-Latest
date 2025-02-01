import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface DeliveryMapProps {
  origin: Location;
  destination: Location;
  currentLocation?: Location;
  estimatedTime?: string;
  distance?: string;
}

export function DeliveryMap({
  origin,
  destination,
  currentLocation,
  estimatedTime,
  distance
}: DeliveryMapProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Delivery Route</h2>
      </div>

      {/* Map Container */}
      <div className="aspect-video bg-gray-100 relative">
        {/* Map would be rendered here using a mapping library */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Map View
        </div>
      </div>

      {/* Delivery Info */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Origin */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
              <MapPin size={16} className="text-gray-400" />
              Origin
            </div>
            <p className="text-gray-600">{origin.address}</p>
          </div>

          {/* Destination */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
              <MapPin size={16} className="text-gray-400" />
              Destination
            </div>
            <p className="text-gray-600">{destination.address}</p>
          </div>
        </div>

        {currentLocation && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
              <Navigation size={16} className="text-blue-600" />
              Current Location
            </div>
            <p className="text-gray-600">{currentLocation.address}</p>
          </div>
        )}

        {(estimatedTime || distance) && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              {estimatedTime && (
                <div>
                  <p className="text-sm text-gray-600">Estimated Time</p>
                  <p className="font-medium text-gray-900">{estimatedTime}</p>
                </div>
              )}
              {distance && (
                <div>
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="font-medium text-gray-900">{distance}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}