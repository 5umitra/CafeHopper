export interface Cafe {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  phone?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface MapState {
  center: [number, number];
  zoom: number;
}