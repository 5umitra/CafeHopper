import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Cafe } from '../types/cafe';
import { Star, MapPin } from 'lucide-react';

// Custom cafe marker icon
const cafeIcon = new L.DivIcon({
  html: `
    <div class="cafe-marker">
      <div class="cafe-marker-icon">☕</div>
    </div>
  `,
  className: 'custom-cafe-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface CafeMarkerProps {
  cafe: Cafe;
  userLocation?: { lat: number; lng: number };
}

const CafeMarker: React.FC<CafeMarkerProps> = ({ cafe, userLocation }) => {
  const distance = userLocation 
    ? calculateDistance(userLocation.lat, userLocation.lng, cafe.lat, cafe.lng)
    : null;

  return (
    <>
      <style>
        {`
          .cafe-marker {
            position: relative;
            width: 32px;
            height: 32px;
            cursor: pointer;
            transition: transform 0.2s ease;
          }
          
          .cafe-marker:hover {
            transform: scale(1.1);
          }
          
          .cafe-marker-icon {
            position: absolute;
            top: 0;
            left: 50%;
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            background: linear-gradient(135deg, #d4a574, #8b5a3c);
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            transform: translateX(-50%) rotate(-45deg);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          
          .cafe-marker-icon::before {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 50%;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #d4a574, #8b5a3c);
            transform: translateX(-50%) rotate(45deg);
            border-right: 2px solid white;
            border-bottom: 2px solid white;
          }
          
          .cafe-marker .cafe-marker-icon {
            transform: translateX(-50%) rotate(-45deg);
          }
          
          .cafe-marker .cafe-marker-icon::after {
            content: '☕';
            transform: rotate(45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
      <Marker position={[cafe.lat, cafe.lng]} icon={cafeIcon}>
        <Popup maxWidth={280} className="custom-popup">
          <div className="p-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
            <h3 className="font-bold text-lg text-amber-900 mb-2">{cafe.name}</h3>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center mr-3">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium text-amber-800">{cafe.rating}</span>
              </div>
              {distance && (
                <div className="flex items-center text-amber-700">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{distance.toFixed(1)} km away</span>
                </div>
              )}
            </div>
            
            {cafe.specialty && (
              <p className="text-sm text-amber-700 mb-2 font-medium">
                {cafe.specialty}
              </p>
            )}
            
            {cafe.address && (
              <p className="text-xs text-amber-600 leading-relaxed">
                {cafe.address}
              </p>
            )}
          </div>
        </Popup>
      </Marker>
    </>
  );
};

// Utility function for distance calculation
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export default CafeMarker;