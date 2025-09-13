import React, { useState, createContext, useContext, ReactNode } from "react";
import type { SelectionState } from "../types/earthquake";

interface EarthquakeContextType {
    selection: SelectionState;
    setSelectedId: (id: string | null) => void;
    setHoveredId: (id: string | null) => void;
}

const EarthquakeContext = createContext<EarthquakeContextType | undefined>(undefined);

interface EarthquakeProviderProps {
    children: ReactNode;
}

export const EarthquakeProvider: React.FC<EarthquakeProviderProps> = ({ children }) => {
    const [selection, setSelection] = useState<SelectionState>({ selectedId: null, hoveredId: null });

    const setSelectedId = (id: string | null) => {
        setSelection((prev) => ({ ...prev, selectedId: id }));
    };

    const setHoveredId = (id: string | null) => {
        setSelection((prev) => ({ ...prev, hoveredId: id }));
    };

    return (
        <EarthquakeContext.Provider value={{ selection, setSelectedId, setHoveredId }}>
            {children}
        </EarthquakeContext.Provider>
    );
}

export const useEarthquakeContext = () => {
  const context = useContext(EarthquakeContext);
  if (context === undefined) {
    throw new Error('useEarthquakeContext must be used within an EarthquakeProvider');
  }
  return context;
};