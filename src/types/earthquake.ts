export interface EarthquakeData {
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  magType: string;
  nst: number | null;
  gap: number | null;
  dmin: number | null;
  rms: number;
  net: string;
  id: string;
  updated: string;
  place: string;
  type: string;
  horizontalError: number | null;
  depthError: number | null;
  magError: number | null;
  magNst: number | null;
  status: string;
  locationSource: string;
  magSource: string;
}

export interface ChartAxisOptions {
  value: keyof EarthquakeData;
  label: string;
}


export interface SelectionState {
  selectedId: string | null;
  hoveredId: string | null;
}