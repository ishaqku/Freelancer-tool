import React, { useState, useEffect } from 'react';
import { useTimer, TimeEntry } from '../hooks/useTimer';
import { Play, Pause, Square, Save, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { format, differenceInMinutes, parseISO } from 'date-fns';

export const TimeTrackerPage = () => {
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [task, setTask] = useState('');
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [hourlyRate, setHourlyRate] = useState(45);

  const { state, start, pause, resume, stop } = useTimer(hourlyRate);

  useEffect(() => {
    const customRate = localStorage.getItem('userHourlyRate');
    if (customRate) {
      setHourlyRate(parseFloat(customRate));
    } else {
      const calcData = localStorage.getItem('calculatorState');
      if (calcData) {
        try {
          const parsed = JSON.parse(calcData);
          if (parsed.calculatedRate) {
            setHourlyRate(parsed.calculatedRate);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    
    // Load entries
    const saved = localStorage.getItem('timeTrackerEntries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEntries(parsed.map((e: any) => ({
          ...e,
          startTime: new Date(e.startTime),
          endTime: e.endTime ? new Date(e.endTime) : undefined
        })));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveEntries = (newEntries: TimeEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('timeTrackerEntries', JSON.stringify(newEntries));
  };

  const handleStart = () => {
    if (!client && !task) {
      alert("Please enter a client or task name");
      return;
    }
    start(client || 'General', project, task);
  };

  const handleStop = () => {
    const entry = stop();
    if (entry) {
      saveEntries([entry, ...entries]);
      setClient('');
      setProject('');
      setTask('');
    }
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalSecondsToday = entries
    .filter(e => e.endTime && new Date(e.endTime).toDateString() === new Date().toDateString())
    .reduce((acc, curr) => acc + (curr.duration || 0), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center">
            <Clock className="w-8 h-8 mr-3 text-blue-600" />
            Time Tracker
          </h1>
          <p className="text-slate-500 mt-2">Log billable hours accurately to generate precise invoices.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
              <input 
                type="text" 
                value={client} 
                onChange={e => setClient(e.target.value)}
                placeholder="e.g. Acme Corp" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                disabled={state.isRunning || state.isPaused}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
              <input 
                type="text" 
                value={project} 
                onChange={e => setProject(e.target.value)}
                placeholder="e.g. Website Redesign" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                disabled={state.isRunning || state.isPaused}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Task</label>
              <input 
                type="text" 
                value={task} 
                onChange={e => setTask(e.target.value)}
                placeholder="e.g. Homepage dev" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                disabled={state.isRunning || state.isPaused}
              />
            </div>
          </div>

          <div className={`flex flex-col md:flex-row items-center justify-between p-6 rounded-xl border-2 transition-all ${state.isRunning ? 'border-blue-500 bg-blue-50/30' : state.isPaused ? 'border-amber-500 bg-amber-50/30' : 'border-slate-100 bg-slate-50'}`}>
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="text-5xl md:text-6xl font-mono font-bold tracking-tighter text-slate-900">
                {formatDuration(state.elapsedSeconds)}
              </div>
              <div className="mt-2 text-sm text-slate-500 font-medium">
                {state.isRunning ? (
                  <span className="flex items-center justify-center md:justify-start text-blue-600">
                    <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    Timer active
                  </span>
                ) : state.isPaused ? (
                  <span className="text-amber-600 flex items-center justify-center md:justify-start">
                    <Pause className="w-4 h-4 mr-1" /> Timer paused
                  </span>
                ) : (
                  <span className="flex items-center justify-center md:justify-start">
                    Ready to start
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {!state.isRunning && !state.isPaused ? (
                <button 
                  onClick={handleStart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center transition-colors shadow-sm"
                >
                  <Play className="w-5 h-5 mr-2" /> Start Timer
                </button>
              ) : (
                <>
                  {state.isRunning ? (
                    <button 
                      onClick={pause}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-700 px-6 py-4 rounded-xl font-bold flex items-center transition-colors border border-amber-200"
                    >
                      <Pause className="w-5 h-5 mr-2" /> Pause
                    </button>
                  ) : (
                    <button 
                      onClick={resume}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-4 rounded-xl font-bold flex items-center transition-colors border border-blue-200"
                    >
                      <Play className="w-5 h-5 mr-2" /> Resume
                    </button>
                  )}
                  <button 
                    onClick={handleStop}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-xl font-bold flex items-center transition-colors shadow-sm"
                  >
                    <Square className="w-5 h-5 mr-2" /> Stop & Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Today's Entries</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {entries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-medium text-slate-500 text-xs uppercase tracking-wider">
                      <th className="p-4">Time</th>
                      <th className="p-4">Client & Project</th>
                      <th className="p-4">Task</th>
                      <th className="p-4 text-right">Duration</th>
                      <th className="p-4 text-right">Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {entries.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 text-slate-500 whitespace-nowrap">
                          {format(entry.startTime, 'HH:mm')} - {entry.endTime ? format(entry.endTime, 'HH:mm') : '...'}
                        </td>
                        <td className="p-4 text-slate-900 font-medium">
                          {entry.client}
                          {entry.project && <span className="block text-xs text-slate-500 font-normal">{entry.project}</span>}
                        </td>
                        <td className="p-4 text-slate-500">
                          {entry.task || '--'}
                        </td>
                        <td className="p-4 text-right font-mono font-medium">
                          {formatDuration(entry.duration || 0)}
                        </td>
                        <td className="p-4 text-right text-emerald-600 font-medium">
                          ${entry.earnings?.toFixed(2) || '0.00'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                <Clock className="w-12 h-12 text-slate-200 mb-4" />
                <p>No time entries yet today.</p>
                <p className="text-sm">Start the timer above to log your work.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Summary</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div>
              <div className="text-sm text-slate-500 mb-1">Today's Total Time</div>
              <div className="text-3xl font-bold text-slate-900">
                {Math.floor(totalSecondsToday / 3600)}h {Math.floor((totalSecondsToday % 3600) / 60)}m
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4">
              <div className="text-sm text-slate-500 mb-1">Estimated Earnings</div>
              <div className="text-2xl font-bold text-emerald-600">
                ${((totalSecondsToday / 3600) * hourlyRate).toFixed(2)}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-500">Weekly Goal</span>
                <span className="font-medium">10 / 25 hrs</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Your logged time can be automatically imported into the <span className="font-semibold">Invoice Generator</span> for quick billing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
