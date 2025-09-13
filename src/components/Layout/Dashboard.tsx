import React from 'react';
import type { EarthquakeData } from '../../types/earthquake';
import LazyEarthquakeChart from '../Chart/LazyEarthquakeChart';
import EarthquakeTable from '../Table/EarthquakeTable';

interface DashboardProps {
  data: EarthquakeData[];
}

const Dashboard: React.FC<DashboardProps> = React.memo(({ data }) => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Modern Header with Glass Effect */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/20 card-shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="animate-fade-in">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">
                Reknowledge Assessment
              </h1>
              <p className="text-slate-600 text-base sm:text-lg font-medium">
                Interactive visualization of global earthquake data
              </p>
            </div>
            {/* Made by Parth Gajjar */}
            <div className="text-sm text-slate-500 italic">
              Made by Parth Gajjar
            </div>

          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="max-w-full mx-auto p-4 sm:p-6">
        {/* Full Width Layout */}
        <div className="space-y-6 animate-fade-in">
          {/* Chart Panel - Full Width */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl card-shadow-lg border border-white/20 overflow-hidden transition-smooth hover-lift">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-4 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Interactive Visualization</h2>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Explore earthquake patterns and correlations</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="h-96 sm:h-[500px] lg:h-[600px] w-full">
                <LazyEarthquakeChart data={data} />
              </div>
            </div>
          </div>
          
          {/* Table Panel - Full Width */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl card-shadow-lg border border-white/20 overflow-hidden transition-smooth hover-lift">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 sm:px-6 py-4 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Data Table</h2>
              </div>
            </div>
            <div className="h-[500px] sm:h-[600px] lg:h-[700px]">
              <EarthquakeTable data={data} />
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
          {[
            { label: 'Total Events', value: data.length.toLocaleString(), color: 'blue' },
            { label: 'Max Magnitude', value: Math.max(...data.map(d => d.mag || 0)).toFixed(1), color: 'red' },
            { label: 'Avg Depth', value: `${(data.reduce((sum, d) => sum + (d.depth || 0), 0) / data.length).toFixed(1)} km`, color: 'green' },
            { label: 'Recent 24h', value: data.filter(d => Date.now() - new Date(d.time).getTime() < 86400000).length.toString(), color: 'purple' }
          ].map((stat, index) => (
            <div key={stat.label} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 card-shadow border border-white/20 transition-smooth hover-lift animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
              <div className="text-slate-600 text-sm sm:text-base font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
});

export default Dashboard;