import { useRef, useEffect, useCallback } from 'react';

export type WorkerMessageType = 'FILTER_DATA' | 'SAMPLE_CHART_DATA' | 'PROCESS_CHART_DATA';

export interface WorkerMessage {
  type: WorkerMessageType;
  data: unknown;
  searchTerm?: string;
  sampleSize?: number;
  xAxis?: string;
  yAxis?: string;
}

export interface WorkerResponse {
  type: string;
  data: unknown;
}

export function useWebWorker(onMessage: (response: WorkerResponse) => void) {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Create worker
    workerRef.current = new Worker('/dataWorker.js');
    
    // Set up message handler
    workerRef.current.onmessage = (e: MessageEvent<WorkerResponse>) => {
      onMessage(e.data);
    };

    // Error handler
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
    };

    // Cleanup on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [onMessage]);

  const postMessage = useCallback((message: WorkerMessage) => {
    if (workerRef.current) {
      workerRef.current.postMessage(message);
    }
  }, []);

  return { postMessage };
}