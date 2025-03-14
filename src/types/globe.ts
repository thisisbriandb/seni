import { Destination } from './geography';

export interface GlobePoint {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
  text?: string;
}

export interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  strokeWidth?: number;
  dashLength?: number;
  dashGap?: number;
  dashAnimateTime?: number;
}

export interface GlobeLabel extends GlobePoint {
  text: string;
  size?: number;
  dotRadius?: number;
  color?: string;
}

export interface GlobeConfig {
  pointOfView: {
    lat: number;
    lng: number;
    altitude: number;
  };
  atmosphereColor: string;
  atmosphereAltitude: number;
  backgroundColor: string;
} 