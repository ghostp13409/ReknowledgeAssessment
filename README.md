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

# AI Uses

- Used AI to convert CSV data schema to earthquake data interface
