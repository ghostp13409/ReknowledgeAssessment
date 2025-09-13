import React, { Suspense } from 'react';
import type { EarthquakeData } from '../../types/earthquake';
import LoadingSpinner from '../UI/LoadingSpinner';

// Lazy load the chart component
const EarthquakeChart = React.lazy(() => import('./EarthquakeChart'));

interface LazyEarthquakeChartProps {
  data: EarthquakeData[];
}

const LazyEarthquakeChart: React.FC<LazyEarthquakeChartProps> = ({ data }) => {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center">
        <LoadingSpinner />
        <span className="ml-3 text-gray-600">Loading chart...</span>
      </div>
    }>
      <EarthquakeChart data={data} />
    </Suspense>
  );
};

export default LazyEarthquakeChart;