import Papa from 'papaparse';
import { EarthquakeData, type ChartAxisOptions } from '../types/earthquake';

// Earthquake data URL
const EARTHQUAKE_DATA_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';

// Function to fetch and parse earthquake data
export const loadEarthquakeData = async (): Promise<EarthquakeData[]> => {
    try {
        const response = await fetch(EARTHQUAKE_DATA_URL);
        const csvData = await response.text();
        const parseResult  = Papa.parse<EarthquakeData>(csvData, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            transformHeader: (header) => {
                // match the CSV headers to the EarthquakeData interface keys
                const headerMap: { [key: string]: keyof EarthquakeData } = {
                    'time': 'time',
                    'latitude': 'latitude',
                    'longitude': 'longitude',
                    'depth': 'depth',
                    'mag': 'mag',
                    'magType': 'magType',
                    'nst': 'nst',
                    'gap': 'gap',
                    'dmin': 'dmin',
                    'rms': 'rms',
                    'net': 'net',
                    'id': 'id',
                    'updated': 'updated',
                    'place': 'place',
                    'type': 'type',
                    'horizontalError': 'horizontalError',
                    'depthError': 'depthError',
                    'magError': 'magError',
                    'magNst': 'magNst',
                    'status': 'status',
                    'locationSource': 'locationSource',
                    'magSource': 'magSource'
                };
                return headerMap[header] || header;
            }
        });

        if (parseResult.errors.length > 0) {
            console.warn('CSV parsing errors:', parseResult.errors);
        }

            // Filter out entries with missing id or mag
        return parseResult.data.filter((row) => row.id && row.mag !== null);

    } catch (error) {
    console.error('Error loading earthquake data:', error);
    throw error;
  }
}

export const getNumericColumns = (): ChartAxisOptions[] => [
  { value: 'mag', label: 'Magnitude' },
  { value: 'depth', label: 'Depth (km)' },
  { value: 'latitude', label: 'Latitude' },
  { value: 'longitude', label: 'Longitude' },
  { value: 'rms', label: 'RMS' },
  { value: 'gap', label: 'Gap (degrees)' },
  { value: 'dmin', label: 'Min Distance' },
  { value: 'horizontalError', label: 'Horizontal Error' },
  { value: 'depthError', label: 'Depth Error' },
  { value: 'magError', label: 'Magnitude Error' }
];