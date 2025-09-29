import { useState, useEffect } from 'react';
import { Cafe, UserLocation } from '../types/cafe';
import { fetchNearbyCafes, convertOverpassNodesToCafes } from '../services/overpassApi';

interface CafesState {
  cafes: Cafe[];
  loading: boolean;
  error: string | null;
}

export const useCafes = (userLocation: UserLocation | null): CafesState => {
  const [state, setState] = useState<CafesState>({
    cafes: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!userLocation) {
      setState({
        cafes: [],
        loading: false,
        error: null,
      });
      return;
    }

    const fetchCafes = async () => {
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const nodes = await fetchNearbyCafes(userLocation.lat, userLocation.lng);
        const cafes = convertOverpassNodesToCafes(nodes);
        
        setState({
          cafes,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          cafes: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch cafes',
        });
      }
    };

    fetchCafes();
  }, [userLocation]);

  return state;
};