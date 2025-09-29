import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { UserLocation } from '../types/cafe';

// Custom user location icon with home
const userIcon = new L.DivIcon({
  html: `
    <div class="user-marker">
      <svg class="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <div class="user-marker-pulse"></div>
    </div>
  `,
  className: 'custom-user-marker',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
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
            width: 28px;
            height: 28px;
          }
          
          .home-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 24px;
            height: 24px;
            color: #3b82f6;
            background: white;
            border-radius: 4px;
            padding: 3px;
            transform: translate(-50%, -50%);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            z-index: 2;
          }
          
          .user-marker-pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 28px;
            height: 28px;
            background: rgba(59, 130, 246, 0.4);
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
          <div className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <h3 className="font-semibold text-blue-800">You are here</h3>
            <p className="text-sm text-blue-600 mt-1">Current location</p>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default UserMarker;
