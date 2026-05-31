import { useState, useRef } from 'react';

export interface TimeEntry {
  client: string;
  project: string;
  task: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  earnings?: number;
}

export function useTimer(hourlyRate: number = 0) {
  const [state, setState] = useState<{
    isRunning: boolean;
    isPaused: boolean;
    elapsedSeconds: number;
    startTime: Date | null;
    currentEntry: TimeEntry | null;
  }>({
    isRunning: false,
    isPaused: false,
    elapsedSeconds: 0,
    startTime: null,
    currentEntry: null
  });

  const intervalRef = useRef<number | null>(null);

  const start = (client: string, project: string, task: string) => {
    setState({
      isRunning: true,
      isPaused: false,
      elapsedSeconds: 0,
      startTime: new Date(),
      currentEntry: { client, project, task, startTime: new Date() }
    });

    intervalRef.current = window.setInterval(() => {
      setState(prev => ({
        ...prev,
        elapsedSeconds: prev.elapsedSeconds + 1
      }));
    }, 1000);
  };

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setState(prev => ({ ...prev, isPaused: true }));
  };

  const resume = () => {
    setState(prev => ({ ...prev, isPaused: false }));
    intervalRef.current = window.setInterval(() => {
      setState(prev => ({
        ...prev,
        elapsedSeconds: prev.elapsedSeconds + 1
      }));
    }, 1000);
  };

  const stop = (): TimeEntry | null => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (!state.currentEntry) return null;

    const endTime = new Date();
    const earnings = (state.elapsedSeconds / 3600) * hourlyRate;
    
    const entry: TimeEntry = {
      ...state.currentEntry,
      endTime,
      duration: state.elapsedSeconds,
      earnings: earnings
    };
    
    setState({
      isRunning: false,
      isPaused: false,
      elapsedSeconds: 0,
      startTime: null,
      currentEntry: null
    });
    
    return entry;
  };

  return { state, start, pause, resume, stop };
}
