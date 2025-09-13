import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="text-center animate-fade-in">
        {/* Modern Loading Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse-slow"></div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute -inset-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                style={{
                  left: `${20 + Math.cos(i * Math.PI / 3) * 30}px`,
                  top: `${20 + Math.sin(i * Math.PI / 3) * 30}px`,
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white mb-2">
            🌍 Loading Earthquake Data
          </h2>
          <p className="text-white/80 text-lg font-medium">
            Fetching the latest seismic activity from USGS...
          </p>
          
          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
        
        {/* Glass card effect */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
          <div className="text-white/70 text-sm">
            <div className="flex items-center justify-between mb-2">
              <span>Connecting to USGS API</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-1 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;