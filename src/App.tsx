import React from 'react';
import { EarthquakeProvider } from './context/EarthquakeContext';
import { useEarthquakeData } from './hooks/useEarthquakeData';
import Dashboard from './components/Layout/Dashboard';
import LoadingSpinner from './components/UI/LoadingSpinner';
import './App.css';

const AppContent: React.FC = () => {
  const { data, loading, error } = useEarthquakeData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center animate-fade-in">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 card-shadow-lg border border-white/20 max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">⚠️ Error Loading Data</h2>
            <p className="text-slate-600 leading-relaxed">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Dashboard data={data} />;
};

function App() {
  return (
    <EarthquakeProvider>
      <AppContent />
    </EarthquakeProvider>
  );
}

export default App;