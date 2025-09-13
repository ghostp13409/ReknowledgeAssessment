import React, { useMemo, useState, useCallback } from 'react';
import type { EarthquakeData } from '../../types/earthquake';
import { useEarthquakeContext } from '../../context/EarthquakeContext';
import { useEarthquakeStore } from '../../store/earthquakeStore';
import { useDebounce } from '../../hooks/useDebounce';

interface EarthquakeTableProps {
  data: EarthquakeData[];
}

const ITEMS_PER_PAGE = 50; // Show 50 items per page for better performance

const EarthquakeTable: React.FC<EarthquakeTableProps> = ({ data }) => {
  const { selection, setSelectedId, setHoveredId } = useEarthquakeContext();
  const { searchTerm, setSearchTerm, setFilteredData } = useEarthquakeStore();
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    { key: 'time', label: 'Time', width: 'min-w-[180px]' },
    { key: 'place', label: 'Location', width: 'min-w-[300px]' },
    { key: 'mag', label: 'Magnitude', width: 'min-w-[100px]' },
    { key: 'depth', label: 'Depth (km)', width: 'min-w-[100px]' },
    { key: 'latitude', label: 'Latitude', width: 'min-w-[100px]' },
    { key: 'longitude', label: 'Longitude', width: 'min-w-[100px]' },
    { key: 'magType', label: 'Mag Type', width: 'min-w-[100px]' },
    { key: 'status', label: 'Status', width: 'min-w-[100px]' }
  ];

  // Debounced search term to prevent excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter data based on debounced search term
  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredData(data);
      return data;
    }
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    const filtered = data.filter(earthquake =>
      earthquake.place.toLowerCase().includes(searchLower) ||
      earthquake.id.toLowerCase().includes(searchLower) ||
      earthquake.mag?.toString().includes(searchLower)
    );
    setFilteredData(filtered);
    return filtered;
  }, [data, debouncedSearchTerm, setFilteredData]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const handleRowClick = useCallback((earthquake: EarthquakeData) => {
    setSelectedId(earthquake.id);
  }, [setSelectedId]);

  const handleRowHover = useCallback((earthquake: EarthquakeData) => {
    setHoveredId(earthquake.id);
  }, [setHoveredId]);

  const handleRowLeave = useCallback(() => {
    setHoveredId(null);
  }, [setHoveredId]);

  const formatValue = useCallback((key: string, value: unknown): string => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (key) {
      case 'time':
        return new Date(value as string | number).toLocaleString();
      case 'mag':
      case 'depth':
      case 'latitude':
      case 'longitude':
        return typeof value === 'number' ? value.toFixed(2) : String(value || 'N/A');
      default:
        return String(value);
    }
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 mx-1 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-slate-800 transition-smooth"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg transition-smooth ${
            currentPage === i
              ? 'bg-emerald-500 text-white shadow-md hover:bg-emerald-600'
              : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 mx-1 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-slate-800 transition-smooth"
      >
        Next
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );

    return <div className="flex justify-center items-center">{pages}</div>;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200/50 flex-shrink-0">
        <div className="p-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by location, magnitude, or earthquake ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-smooth shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-emerald-700 font-medium">
              Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredData.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length} earthquakes
              {filteredData.length !== data.length && ` (filtered from ${data.length})`}
            </p>
            {filteredData.length > 0 && (
              <div className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                {currentPage} of {totalPages} pages
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced Table - with horizontal scroll for all columns */}
      <div className="flex-1 overflow-auto min-h-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1200px]">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 sticky top-0 z-10">
              <tr>
                {columns.map(column => (
                  <th key={column.key} className={`px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-b-2 border-slate-200 ${column.width}`}>
                    <div className="flex items-center space-x-2">
                      <span>{column.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {paginatedData.map((earthquake, index) => {
                const isSelected = earthquake.id === selection.selectedId;
                const isHovered = earthquake.id === selection.hoveredId;
                const magnitude = earthquake.mag || 0;
                
                return (
                  <tr
                    key={earthquake.id}
                    className={`
                      cursor-pointer transition-all duration-200
                      ${isSelected
                        ? 'bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 shadow-sm'
                        : isHovered
                          ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 shadow-sm'
                          : index % 2 === 0
                            ? 'bg-white hover:bg-slate-50'
                            : 'bg-slate-25 hover:bg-slate-50'
                      }
                      hover:shadow-sm hover:scale-[1.001] transform
                    `}
                    onClick={() => handleRowClick(earthquake)}
                    onMouseEnter={() => handleRowHover(earthquake)}
                    onMouseLeave={handleRowLeave}
                  >
                    {columns.map(column => (
                      <td key={column.key} className={`px-6 py-4 text-sm ${column.width}`}>
                        <div className="flex items-center space-x-2">
                          {column.key === 'mag' && (
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                              magnitude >= 6 ? 'bg-red-500' :
                              magnitude >= 4 ? 'bg-orange-500' :
                              magnitude >= 2 ? 'bg-yellow-500' : 'bg-green-500'
                            }`} />
                          )}
                          <span className={`
                            ${column.key === 'place' ? 'font-medium text-slate-800' : 'text-slate-700'}
                            ${column.key === 'mag' && magnitude >= 5 ? 'font-bold text-red-600' : ''}
                            whitespace-nowrap
                          `}>
                            {formatValue(column.key, earthquake[column.key as keyof EarthquakeData])}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No earthquakes found</h3>
            <p className="text-slate-500 max-w-md">
              Try adjusting your search terms or clearing the search to see all earthquake data.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 p-4 flex-shrink-0">
        {renderPagination()}
      </div>
    </div>
  );
};

export default React.memo(EarthquakeTable);