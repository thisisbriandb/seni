export interface Destination {
  id: string;
  name: string;
  coordinates: [number, number];
  flagCode: string;
  description: string;
}

export interface Route {
  origin: string;
  destination: string;
  curve: number;
} 