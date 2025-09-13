# Earthquake Data Visualization App

## Project Summary

This single-page web application fetches geographic statistical data (earthquakes) from a public source and presents it through interactive charts and data tables. The chart and table panels are interconnected, allowing users to select and highlight data across both views. The app demonstrates multiple state management approaches and is optimized for large datasets.

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/ghostp13409/ReknowledgeAssessment.git
   cd ReknowledgeAssessment
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Run the development server:**
   ```
   npm run dev
   ```
4. **Build for production:**
   ```
   npm run build
   ```

## External Dependencies

- **React**: UI library for building components.
- **TypeScript**: Type safety and improved developer experience.
- **Vite**: Fast development server and build tool.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Recharts**: Charting library for data visualization.
- **Zustand**: Global state management.
- **Papaparse**: CSV parsing.
- **react-window**: Table virtualization for performance.
- **@types/papaparse, @types/react-window**: TypeScript type definitions.

## Features

- Responsive two-panel layout (chart and table).
- Interactive scatter plot with axis selection controls.
- Scrollable data table with row selection.
- Interconnected selection: selecting a table row highlights the chart point and vice versa.
- Performance optimizations for large datasets (pagination, chart sampling, virtualization, memoization).
- Web Worker for background data processing.
- Service Worker for API response caching.
- Multiple state management approaches:
  - **Props Pattern**: Data and event handlers passed via props.
  - **React Context**: Context for selected earthquake entry.
  - **Zustand Store**: Global state for selections and filters.

## Additional Features & Reasoning

- Lazy-loaded chart for improved initial load time.
- Debounce hook for efficient search/filtering.
- Advanced React patterns for maintainability and performance.
- Modern UI design for usability.

# Steps

1. Initialized the project with `npm create vite@latest`
2. Installed tailwindcss.
3. Installed Dependencies:
   - @types/papaparse
   - papaparse
   - recharts
   - zustand
4. Defined earthquake type interface in `src/types/earthquake.ts`
5. Defined functions to fetch and parse CSV data and get numeric columns for chart axes in `src/utils/dataLoader.ts`
6. Created Custom Hooks in `src/hooks/useEarthquakeData.ts` to fetch and manage earthquake data
7. Created Context and Provider in `src/context/EarthquakeContext.tsx` to manage earthquake data state
8. Created Zustand store in `src/store/useEarthquakeStore.ts` to manage earthquake data and chart axis selections
9. Implemented UI Components:
   - `src/components/Layout/Dashboard.tsx`: Main dashboard layout
   - `src/components/Chart/EarthquakeChart.tsx`: Scatter chart visualization
   - `src/components/Chart/ChartControls.tsx`: Controls for selecting chart axes
   - `src/components/Table/EarthquakeTable.tsx`: Table to display earthquake data
   - `src/components/UI/LoadingSpinner.tsx`: Loading spinner component
10. Implemented Performance Optimizations for Large Datasets (~10,000+ entries):
    - Installed react-window and @types/react-window for virtualization
    - Created debounce hook in `src/hooks/useDebounce.ts` to prevent excessive search filtering
    - Replaced table virtualization with pagination (50 items per page) for better browser compatibility
    - Added chart data sampling to limit rendering to 2,000 points maximum for performance
    - Implemented React.memo() on all major components to prevent unnecessary re-renders
    - Created lazy-loaded chart component in `src/components/Chart/LazyEarthquakeChart.tsx`
    - Built Web Worker in `public/dataWorker.js` for background data processing
    - Created Web Worker hook in `src/hooks/useWebWorker.ts` for easy worker integration
    - Implemented Service Worker in `public/sw.js` for API response caching
    - Registered Service Worker in `src/main.tsx` for production builds

# AI Uses

- **AI Code Completion Setup**: Initial Assessment File + (AI Generated) Data Schema in the doc folder for effective code completion with local LLM
- Used AI to **convert CSV** data schema to **earthquake data interface**
  - Prompt: dataset file + "Read the first 5 lines of this CSV and convert it to a Database schema in markdown format in doc folder"
  - Prompt: "Convert the db schema to a TypeScript interface"
- Used AI Agent to **optimize performance** bottlenecks and implement advanced React patterns
  - Prompt: "Suggest good performance optimizations for managing large datasets in React"
  - Prompt: "Suggest advanced React patterns to improve state management and component structure"
- Used AI Agent to **Improve initial design**
  - Prompt: "can you redesign my interface to look more modern and user friendly"
