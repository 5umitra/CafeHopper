import { Cafe } from '../types/cafe';

/**
 * Parses cafe data from JSON and validates the structure
 * @param jsonData - Raw JSON data to parse
 * @returns Array of validated Cafe objects
 */
export const parseCafeData = (jsonData: any[]): Cafe[] => {
  if (!Array.isArray(jsonData)) {
    throw new Error('Invalid cafe data: expected an array');
  }

  return jsonData.map((item, index) => {
    if (!item.name || typeof item.name !== 'string') {
      throw new Error(`Invalid cafe at index ${index}: missing or invalid name`);
    }
    
    if (typeof item.lat !== 'number' || typeof item.lng !== 'number') {
      throw new Error(`Invalid cafe at index ${index}: missing or invalid coordinates`);
    }

    if (item.lat < -90 || item.lat > 90 || item.lng < -180 || item.lng > 180) {
      throw new Error(`Invalid cafe at index ${index}: coordinates out of valid range`);
    }

    return {
      id: item.id || index + 1,
      name: item.name.trim(),
      lat: Number(item.lat),
      lng: Number(item.lng),
      address: item.address || '',
      rating: item.rating || 0,
      specialty: item.specialty || '',
    };
  });
};

/**
 * Calculates distance between two coordinates using Haversine formula
 * @param lat1 - First latitude
 * @param lng1 - First longitude  
 * @param lat2 - Second latitude
 * @param lng2 - Second longitude
 * @returns Distance in kilometers
 */
export const calculateDistance = (
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