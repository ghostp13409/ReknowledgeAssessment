import React from 'react';
import type { ChartAxisOptions } from '../../types/earthquake';

interface ChartControlsProps {
  xAxis: string;
  yAxis: string;
  onXAxisChange: (value: string) => void;
  onYAxisChange: (value: string) => void;
  axisOptions: ChartAxisOptions[];
}

const ChartControls: React.FC<ChartControlsProps> = ({
  xAxis,
  yAxis,
  onXAxisChange,
  onYAxisChange,
  axisOptions
}) => {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-3 sm:p-4 mb-4 border border-slate-200/60 backdrop-blur-sm">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-3 sm:hidden">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-slate-700">Chart Controls</span>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="flex flex-col space-y-3 sm:hidden">
        {/* X-Axis Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center space-x-1">
            <span>X-Axis:</span>
          </label>
          <div className="relative">
            <select
              value={xAxis}
              onChange={(e) => onXAxisChange(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-smooth cursor-pointer"
            >
              {axisOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Y-Axis Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center space-x-1">
            <span>Y-Axis:</span>
          </label>
          <div className="relative">
            <select
              value={yAxis}
              onChange={(e) => onYAxisChange(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 shadow-sm hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-smooth cursor-pointer"
            >
              {axisOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center gap-4 lg:gap-6">
        {/* Header */}
        <div className="flex items-center space-x-2 mr-2 lg:mr-4">
          <span className="text-sm font-semibold text-slate-700">Chart Controls</span>
        </div>
        
        {/* X-Axis Control */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          <label className="text-sm font-medium text-slate-600 flex items-center space-x-1">
            <span className="hidden lg:inline">X-Axis:</span>
            <span className="lg:hidden">X:</span>
          </label>
          <div className="relative">
            <select
              value={xAxis}
              onChange={(e) => onXAxisChange(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-3 lg:px-4 py-2 pr-8 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-smooth cursor-pointer min-w-0"
            >
              {axisOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        
        {/* Y-Axis Control */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          <label className="text-sm font-medium text-slate-600 flex items-center space-x-1">
            <span className="hidden lg:inline">Y-Axis:</span>
            <span className="lg:hidden">Y:</span>
          </label>
          <div className="relative">
            <select
              value={yAxis}
              onChange={(e) => onYAxisChange(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-3 lg:px-4 py-2 pr-8 text-sm font-medium text-slate-700 shadow-sm hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-smooth cursor-pointer min-w-0"
            >
              {axisOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Info Button */}
        <div className="ml-auto hidden lg:block">
          <button className="p-2 rounded-lg bg-white/60 hover:bg-white border border-slate-200 text-slate-500 hover:text-slate-700 transition-smooth group relative">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="absolute -top-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Select axes to explore correlations
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartControls;