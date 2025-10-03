import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Cafe, UserLocation, MapState } from '../types/cafe';
import UserMarker from './UserMarker';
import CafeMarker from './CafeMarker';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapViewProps {
  userLocation: UserLocation | null;
  cafes: Cafe[];
  mapState: MapState;
  selectedCafeId: number | null;
  onMapReady: (map: L.Map) => void;
}

const MapView: React.FC<MapViewProps> = ({
  userLocation,
  cafes,
  mapState,
  selectedCafeId,
  onMapReady,
}) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      onMapReady(mapRef.current);
    }
  }, [onMapReady]);

  const handleMapCreated = (map: L.Map) => {
    mapRef.current = map;
    onMapReady(map);
  };

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-amber-700/30 bg-gradient-to-br from-amber-900/15 to-amber-800/20 backdrop-blur-sm">
      <MapContainer
        center={mapState.center}
        zoom={mapState.zoom}
        className="h-full w-full"
        zoomControl={false}
        ref={handleMapCreated}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Custom zoom control */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-1">
          <button
            onClick={() => mapRef.current?.zoomIn()}
            className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl shadow-xl hover:bg-neutral-100 transition-all duration-200 flex items-center justify-center text-neutral-800 hover:text-black font-bold text-lg hover:scale-110"
          >
            +
          </button>
          <button
            onClick={() => mapRef.current?.zoomOut()}
            className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl shadow-xl hover:bg-neutral-100 transition-all duration-200 flex items-center justify-center text-neutral-800 hover:text-black font-bold text-lg hover:scale-110"
          >
            −
          </button>
        </div>
        
        {userLocation && <UserMarker location={userLocation} />}
        
        {cafes.map((cafe) => (
          <CafeMarker
            key={cafe.id}
            cafe={cafe}
            userLocation={userLocation || undefined}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;