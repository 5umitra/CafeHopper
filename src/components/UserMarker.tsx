import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { UserLocation } from '../types/cafe';

// Custom user location icon
const userIcon = new L.DivIcon({
  html: `
    <div class="user-marker">
      <div class="user-marker-inner"></div>
      <div class="user-marker-pulse"></div>
    </div>
  `,
  className: 'custom-user-marker',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface UserMarkerProps {
  location: UserLocation;
}

const UserMarker: React.FC<UserMarkerProps> = ({ location }) => {
  return (
    <>
      <style>
        {`
          .user-marker {
            position: relative;
            width: 24px;
            height: 24px;
          }
          
          .user-marker-inner {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: 12px;
            background: #d4a574;
            border: 3px solid white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            z-index: 2;
          }
          
          .user-marker-pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 24px;
            height: 24px;
            background: rgba(212, 165, 116, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(0.8);
              opacity: 1;
            }
            70% {
              transform: translate(-50%, -50%) scale(2);
              opacity: 0;
            }
            100% {
              transform: translate(-50%, -50%) scale(2.2);
              opacity: 0;
            }
          }
        `}
      </style>
      <Marker position={[location.lat, location.lng]} icon={userIcon}>
        <Popup>
          <div className="text-center p-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
            <h3 className="font-semibold text-amber-800">You are here</h3>
            <p className="text-sm text-amber-600 mt-1">Current location</p>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default UserMarker;