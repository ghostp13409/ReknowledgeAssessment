// Web Worker for processing earthquake data
self.onmessage = function (e) {
  const { type, data, searchTerm, sampleSize } = e.data;

  switch (type) {
    case "FILTER_DATA":
      const filteredResults = filterData(data, searchTerm);
      self.postMessage({
        type: "FILTER_COMPLETE",
        data: filteredResults,
      });
      break;

    case "SAMPLE_CHART_DATA":
      const sampledResults = sampleChartData(data, sampleSize);
      self.postMessage({
        type: "SAMPLE_COMPLETE",
        data: sampledResults,
      });
      break;

    case "PROCESS_CHART_DATA":
      const processedResults = processChartData(
        data,
        e.data.xAxis,
        e.data.yAxis
      );
      self.postMessage({
        type: "PROCESS_COMPLETE",
        data: processedResults,
      });
      break;

    default:
      console.warn("Unknown worker message type:", type);
  }
};

// Filter earthquake data based on search term
function filterData(data, searchTerm) {
  if (!searchTerm || !searchTerm.trim()) {
    return data;
  }

  const searchLower = searchTerm.toLowerCase();
  return data.filter(
    (earthquake) =>
      earthquake.place.toLowerCase().includes(searchLower) ||
      earthquake.id.toLowerCase().includes(searchLower) ||
      (earthquake.mag && earthquake.mag.toString().includes(searchLower))
  );
}

// Sample data for chart performance
function sampleChartData(data, maxPoints = 2000) {
  if (data.length <= maxPoints) {
    return data;
  }

  const sampleRate = Math.ceil(data.length / maxPoints);
  const sampled = [];

  // Take every nth item
  for (let i = 0; i < data.length; i += sampleRate) {
    sampled.push(data[i]);
  }

  return sampled;
}

// Process chart data for visualization
function processChartData(data, xAxis, yAxis) {
  return data
    .map((earthquake) => ({
      ...earthquake,
      x: earthquake[xAxis],
      y: earthquake[yAxis],
    }))
    .filter(
      (item) =>
        item.x !== null &&
        item.y !== null &&
        item.x !== undefined &&
        item.y !== undefined
    );
}

// Calculate statistics for data insights
function calculateStatistics(data) {
  if (!data || data.length === 0) return null;

  const magnitudes = data
    .map((item) => item.mag)
    .filter((mag) => mag !== null && mag !== undefined);
  const depths = data
    .map((item) => item.depth)
    .filter((depth) => depth !== null && depth !== undefined);

  return {
    count: data.length,
    avgMagnitude:
      magnitudes.reduce((sum, mag) => sum + mag, 0) / magnitudes.length,
    maxMagnitude: Math.max(...magnitudes),
    minMagnitude: Math.min(...magnitudes),
    avgDepth: depths.reduce((sum, depth) => sum + depth, 0) / depths.length,
    maxDepth: Math.max(...depths),
    minDepth: Math.min(...depths),
  };
}
