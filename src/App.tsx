import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import { Cafe, MapState } from './types/cafe';
import { useGeolocation } from './hooks/useGeolocation';
import { useCafes } from './hooks/useCafes';
import ThreeBackground from './components/ThreeBackground';
import MapView from './components/MapView';
import CafeList from './components/CafeList';
import { AlertCircle, MapPin, Loader2, Coffee } from 'lucide-react';

const App: React.FC = () => {
  const { location: userLocation, loading: locationLoading, error: locationError } = useGeolocation();
  const { cafes, loading: cafesLoading, error: cafesError } = useCafes(userLocation);
  const [selectedCafeId, setSelectedCafeId] = useState<number | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [mapState, setMapState] = useState<MapState>({
    center: [37.7749, -122.4194], // Default to San Francisco
    zoom: 13,
  });
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Update map center when user location is available
  useEffect(() => {
    if (userLocation) {
      setMapState({
        center: [userLocation.lat, userLocation.lng],
        zoom: 14,
      });
      
      // Smoothly pan to user location if map is ready
      if (mapInstance) {
        mapInstance.setView([userLocation.lat, userLocation.lng], 14, {
          animate: true,
          duration: 1.5,
        });
      }
    }
  }, [userLocation, mapInstance]);

  const handleMapReady = useCallback((map: L.Map) => {
    setMapInstance(map);
  }, []);

  const handleCafeSelect = useCallback((cafeId: number) => {
    const cafe = cafes.find(c => c.id === cafeId);
    if (cafe && mapInstance) {
      setSelectedCafeId(cafeId);
      
      // Smoothly pan to the selected cafe
      mapInstance.setView([cafe.lat, cafe.lng], 16, {
        animate: true,
        duration: 1.0,
      });

      // Open the popup after a short delay
      setTimeout(() => {
        mapInstance.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const position = layer.getLatLng();
            if (position.lat === cafe.lat && position.lng === cafe.lng) {
              layer.openPopup();
            }
          }
        });
      }, 800);
    }
  }, [cafes, mapInstance]);

  const toggleMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen(prev => !prev);
  }, []);

  // Loading state
  if (locationLoading || (userLocation && cafesLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ThreeBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-neutral-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-700/50"
        >
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            {locationLoading ? 'Finding your location...' : 'Loading nearby cafes...'}
          </h2>
          <p className="text-neutral-300">
            {locationLoading 
              ? 'Please allow location access to find nearby cafes'
              : 'Searching for cafes within 8km of your location'
            }
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ThreeBackground />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-50 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neutral-800/80 backdrop-blur-sm rounded-xl border border-neutral-600/40">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CafeHopper</h1>
              <p className="text-neutral-300 text-sm">Hop from cafe to cafe around you</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Location Error */}
      <AnimatePresence>
        {(locationError || cafesError) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 z-40 motion-safe:animate-pulse"
          >
            <div className="p-4 bg-red-900/90 backdrop-blur-md text-red-100 rounded-2xl shadow-xl border border-red-700/60">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    {locationError ? 'Location Error' : 'Cafes Loading Error'}
                  </p>
                  <p className="text-sm text-red-200">{locationError || cafesError}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Cafes Found Message */}
      <AnimatePresence>
        {userLocation && !cafesLoading && !cafesError && cafes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 z-40 motion-safe:animate-bounce"
          >
            <div className="p-4 bg-neutral-800/90 backdrop-blur-md text-white rounded-2xl shadow-xl border border-neutral-600/50">
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">No Cafes Found</p>
                  <p className="text-sm text-neutral-300">
                    No cafes found within 8km of your location. Try moving to a different area.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pt-32 pb-8 px-6 h-screen"
      >
        <div className="h-full flex gap-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000">
          {/* Sidebar - Desktop Only */}
          <CafeList
            cafes={cafes}
            userLocation={userLocation}
            selectedCafeId={selectedCafeId}
            onCafeSelect={handleCafeSelect}
            isOpen={isMobileDrawerOpen}
            onToggle={toggleMobileDrawer}
          />
          
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            className="flex-1 h-full"
            whileHover={{ scale: 1.002 }}
          >
            <MapView
              userLocation={userLocation}
              cafes={cafes}
              mapState={mapState}
              selectedCafeId={selectedCafeId}
              onMapReady={handleMapReady}
            />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default App;