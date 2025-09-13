import { useState, useEffect } from "react";
import type { EarthquakeData } from "../types/earthquake";
import { loadEarthquakeData } from "../utils/dataLoader";

export const useEarthQuakeData = () => {
    const [data, setData] = useState<EarthquakeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const earthquakeData = await loadEarthquakeData();
                setData(earthquakeData);
                setError(null);
            } catch (err) {
                setError('Failed to load earthquake data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };

}