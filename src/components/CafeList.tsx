import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cafe, UserLocation } from '../types/cafe';
import { MapPin, Coffee, Navigation, Phone } from 'lucide-react';
import { calculateDistance } from '../utils/cafeUtils';

interface CafeListProps {
  cafes: Cafe[];
  userLocation: UserLocation | null;
  selectedCafeId: number | null;
  onCafeSelect: (cafeId: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const CafeList: React.FC<CafeListProps> = ({
  cafes,
  userLocation,
  selectedCafeId,
  onCafeSelect,
  isOpen,
  onToggle,
}) => {
  // Sort cafes by distance if user location is available
  const sortedCafes = userLocation 
    ? [...cafes].sort((a, b) => {
        const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distanceA - distanceB;
      })
    : cafes;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden lg:flex flex-col h-full w-80 bg-black/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-neutral-800/60 overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 80 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <div className="p-6 border-b border-neutral-800/60 bg-gradient-to-r from-neutral-900 to-black">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-700/80 rounded-xl backdrop-blur-sm">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Nearby Cafes</h2>
              <p className="text-neutral-300 text-sm">{cafes.length} cafes found</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/60">
          <AnimatePresence>
            {sortedCafes.map((cafe, index) => {
              const distance = userLocation 
                ? calculateDistance(userLocation.lat, userLocation.lng, cafe.lat, cafe.lng)
                : null;
              
              return (
                <motion.div
                  key={cafe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedCafeId === cafe.id
                      ? 'bg-neutral-700 border-2 border-neutral-500 shadow-xl'
                      : 'bg-neutral-800/90 border border-neutral-700/50 hover:bg-neutral-700/90 hover:border-neutral-600'
                  }`}
                  onClick={() => onCafeSelect(cafe.id)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white text-lg leading-tight">
                      {cafe.name}
                    </h3>
                    {distance && (
                      <div className="flex items-center text-neutral-300 text-xs ml-2">
                        <Navigation className="w-3 h-3 mr-1" />
                        {distance.toFixed(1)}km
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Phone className="w-3 h-3 text-neutral-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {cafe.phone || 'Sorry! Number not found'}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-3 h-3 text-neutral-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {cafe.address || 'Sorry! Address not found'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Bottom Drawer */}
      <div className="lg:hidden">
        {/* Toggle Button */}
        <motion.button
          onClick={onToggle}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-md rounded-full p-3 shadow-xl border border-neutral-300/50"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Coffee className="w-6 h-6 text-neutral-800" />
          <span className="absolute -top-2 -right-2 bg-neutral-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cafes.length}
          </span>
        </motion.button>

        {/* Bottom Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
                onClick={onToggle}
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-[1000] bg-black/90 backdrop-blur-2xl rounded-t-3xl shadow-2xl border-t border-neutral-800/60 max-h-[70vh] overflow-hidden"
              >
                <div className="p-4 border-b border-neutral-800/60 bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-neutral-700/80 rounded-xl">
                        <Coffee className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-white">Nearby Cafes</h2>
                        <p className="text-neutral-300 text-sm">{cafes.length} cafes found</p>
                      </div>
                    </div>
                    <button
                      onClick={onToggle}
                      className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      <div className="w-6 h-1 bg-neutral-400 rounded-full"></div>
                    </button>
                  </div>
                </div>
                
                <div className="overflow-y-auto p-4 space-y-3 bg-black/60">
                  {sortedCafes.map((cafe) => {
                    const distance = userLocation 
                      ? calculateDistance(userLocation.lat, userLocation.lng, cafe.lat, cafe.lng)
                      : null;
                    
                    return (
                      <motion.div
                        key={cafe.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          selectedCafeId === cafe.id
                            ? 'bg-neutral-700 border-2 border-neutral-500'
                            : 'bg-neutral-800/90 border border-neutral-700/50 hover:bg-neutral-700/90'
                        }`}
                        onClick={() => {
                          onCafeSelect(cafe.id);
                          onToggle();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white leading-tight">
                            {cafe.name}
                          </h3>
                          {distance && (
                            <div className="flex items-center text-neutral-300 text-xs ml-2">
                              <Navigation className="w-3 h-3 mr-1" />
                              {distance.toFixed(1)}km
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Phone className="w-3 h-3 text-neutral-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-neutral-300 leading-relaxed">
                              {cafe.phone || 'Sorry! Number not found'}
                            </p>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-neutral-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-neutral-300 leading-relaxed">
                              {cafe.address || 'Sorry! Address not found'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CafeList;