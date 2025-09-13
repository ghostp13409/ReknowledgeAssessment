import { create } from 'zustand';
import type { EarthquakeData } from '../types/earthquake';

interface EarthquakeStore {
  filteredData: EarthquakeData[];
  setFilteredData: (data: EarthquakeData[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  filteredData: [],
  setFilteredData: (data) => set({ filteredData: data }),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));