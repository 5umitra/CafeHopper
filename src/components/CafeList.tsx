import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cafe, UserLocation } from '../types/cafe';
import { Star, MapPin, Coffee, Navigation } from 'lucide-react';
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
        className="hidden lg:flex flex-col h-full w-80 bg-amber-50/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-amber-200/30 overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 80 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <div className="p-6 border-b border-amber-200/30 bg-gradient-to-r from-amber-600/30 to-orange-600/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100/30 rounded-xl backdrop-blur-sm">
              <Coffee className="w-6 h-6 text-amber-50" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-50">Nearby Cafes</h2>
              <p className="text-amber-100/80 text-sm">{cafes.length} cafes found</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                      ? 'bg-amber-100/40 border-2 border-amber-200/50 shadow-xl'
                      : 'bg-amber-50/15 border border-amber-200/25 hover:bg-amber-100/25 hover:border-amber-200/40'
                  }`}
                  onClick={() => onCafeSelect(cafe.id)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-amber-50 text-lg leading-tight">
                      {cafe.name}
                    </h3>
                    {distance && (
                      <div className="flex items-center text-amber-100/80 text-xs ml-2">
                        <Navigation className="w-3 h-3 mr-1" />
                        {distance.toFixed(1)}km
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-amber-50/90">
                        {cafe.rating}
                      </span>
                    </div>
                  </div>
                  
                  {cafe.specialty && (
                    <p className="text-sm text-amber-200 mb-2 font-medium">
                      {cafe.specialty}
                    </p>
                  )}
                  
                  {cafe.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3 h-3 text-amber-100/60 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-amber-100/80 leading-relaxed">
                        {cafe.address}
                      </p>
                    </div>
                  )}
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
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-amber-50/95 backdrop-blur-md rounded-full p-3 shadow-xl border border-amber-200/40"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Coffee className="w-6 h-6 text-amber-700" />
          <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
                className="fixed inset-0 bg-amber-900/20 backdrop-blur-sm z-[999]"
                onClick={onToggle}
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-[1000] bg-amber-50/95 backdrop-blur-2xl rounded-t-3xl shadow-2xl border-t border-amber-200/30 max-h-[70vh] overflow-hidden"
              >
                <div className="p-4 border-b border-amber-200/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-600/20 rounded-xl">
                        <Coffee className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <h2 className="font-bold text-amber-900">Nearby Cafes</h2>
                        <p className="text-amber-700 text-sm">{cafes.length} cafes found</p>
                      </div>
                    </div>
                    <button
                      onClick={onToggle}
                      className="p-2 hover:bg-amber-100/50 rounded-lg transition-colors"
                    >
                      <div className="w-6 h-1 bg-amber-300 rounded-full"></div>
                    </button>
                  </div>
                </div>
                
                <div className="overflow-y-auto p-4 space-y-3">
                  {sortedCafes.map((cafe) => {
                    const distance = userLocation 
                      ? calculateDistance(userLocation.lat, userLocation.lng, cafe.lat, cafe.lng)
                      : null;
                    
                    return (
                      <motion.div
                        key={cafe.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          selectedCafeId === cafe.id
                            ? 'bg-amber-100/60 border-2 border-amber-300'
                            : 'bg-white/70 border border-amber-200/50 hover:bg-amber-50/80'
                        }`}
                        onClick={() => {
                          onCafeSelect(cafe.id);
                          onToggle();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-amber-900 leading-tight">
                            {cafe.name}
                          </h3>
                          {distance && (
                            <div className="flex items-center text-amber-600 text-xs ml-2">
                              <Navigation className="w-3 h-3 mr-1" />
                              {distance.toFixed(1)}km
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium text-amber-800">
                              {cafe.rating}
                            </span>
                          </div>
                        </div>
                        
                        {cafe.specialty && (
                          <p className="text-sm text-amber-700 mb-2 font-medium">
                            {cafe.specialty}
                          </p>
                        )}
                        
                        {cafe.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-amber-700 leading-relaxed">
                              {cafe.address}
                            </p>
                          </div>
                        )}
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