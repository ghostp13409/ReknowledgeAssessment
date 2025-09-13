import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { EarthquakeData } from '../../types/earthquake';
import { useEarthquakeContext } from '../../context/EarthquakeContext';
import ChartControls from './ChartControls';
import { getNumericColumns } from '../../utils/dataLoader';

interface EarthquakeChartProps {
  data: EarthquakeData[];
}

const EarthquakeChart: React.FC<EarthquakeChartProps> = ({ data }) => {
  const { selection, setSelectedId, setHoveredId } = useEarthquakeContext();
  const [xAxis, setXAxis] = useState<string>('mag');
  const [yAxis, setYAxis] = useState<string>('depth');
  const axisOptions = getNumericColumns();

  // Sample data for better performance - show max 2000 points for large datasets
  const sampledData = useMemo(() => {
    const MAX_CHART_POINTS = 2000;
    
    if (data.length <= MAX_CHART_POINTS) {
      return data;
    }
    
    // Sample data by taking every nth item and always include selected/hovered items
    const sampleRate = Math.ceil(data.length / MAX_CHART_POINTS);
    const sampled: EarthquakeData[] = [];
    const selectedId = selection.selectedId;
    const hoveredId = selection.hoveredId;
    
    for (let i = 0; i < data.length; i += sampleRate) {
      sampled.push(data[i]);
    }
    
    // Ensure selected and hovered items are included
    if (selectedId) {
      const selectedItem = data.find(item => item.id === selectedId);
      if (selectedItem && !sampled.some(item => item.id === selectedId)) {
        sampled.push(selectedItem);
      }
    }
    
    if (hoveredId && hoveredId !== selectedId) {
      const hoveredItem = data.find(item => item.id === hoveredId);
      if (hoveredItem && !sampled.some(item => item.id === hoveredId)) {
        sampled.push(hoveredItem);
      }
    }
    
    return sampled;
  }, [data, selection.selectedId, selection.hoveredId]);

  const chartData = useMemo(() => {
    return sampledData.map(earthquake => ({
      ...earthquake,
      x: earthquake[xAxis as keyof EarthquakeData] as number,
      y: earthquake[yAxis as keyof EarthquakeData] as number,
    })).filter(item => item.x !== null && item.y !== null);
  }, [sampledData, xAxis, yAxis]);

  const handleDotClick = (data: EarthquakeData) => {
    setSelectedId(data.id);
  };

  const handleDotMouseEnter = (data: EarthquakeData) => {
    setHoveredId(data.id);
  };

  const handleDotMouseLeave = () => {
    setHoveredId(null);
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isSelected = payload.id === selection.selectedId;
    const isHovered = payload.id === selection.hoveredId;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isSelected ? 6 : isHovered ? 4 : 3}
        fill={isSelected ? '#ef4444' : isHovered ? '#f59e0b' : '#3b82f6'}
        opacity={isSelected ? 1 : isHovered ? 0.8 : 0.6}
        style={{ cursor: 'pointer' }}
        onClick={() => handleDotClick(payload)}
        onMouseEnter={() => handleDotMouseEnter(payload)}
        onMouseLeave={handleDotMouseLeave}
      />
    );
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: EarthquakeData }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold">{data.place}</p>
          <p>Magnitude: {data.mag}</p>
          <p>Depth: {data.depth} km</p>
          <p>Time: {new Date(data.time).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const xAxisOption = axisOptions.find(opt => opt.value === xAxis);
  const yAxisOption = axisOptions.find(opt => opt.value === yAxis);

  return (
    <div className="h-full flex flex-col">
      <ChartControls
        xAxis={xAxis}
        yAxis={yAxis}
        onXAxisChange={setXAxis}
        onYAxisChange={setYAxis}
        axisOptions={axisOptions}
      />
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name={xAxisOption?.label}
              label={{ value: xAxisOption?.label, position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name={yAxisOption?.label}
              label={{ value: yAxisOption?.label, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={chartData} 
              fill="#3b82f6"
              shape={<CustomDot />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(EarthquakeChart);