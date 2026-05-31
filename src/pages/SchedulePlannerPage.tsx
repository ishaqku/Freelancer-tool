import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, Trash2, Clock, Info } from 'lucide-react';
import { format, startOfWeek, addDays } from 'date-fns';

export interface TimeBlock {
  id: string;
  day: number; // 0-6
  startHour: number; // 0-23
  hours: number;
  type: 'billable' | 'admin' | 'break';
  label: string;
}

export const SchedulePlannerPage = () => {
  const [blocks, setBlocks] = useState<TimeBlock[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState(25);
  const [hourlyRate, setHourlyRate] = useState(45);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newBlock, setNewBlock] = useState<Partial<TimeBlock>>({
    day: 1,
    startHour: 9,
    hours: 2,
    type: 'billable',
    label: ''
  });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  useEffect(() => {
    // Load from calculator
    const customRate = localStorage.getItem('userHourlyRate');
    if (customRate) {
      setHourlyRate(parseFloat(customRate));
    }
    
    const calcData = localStorage.getItem('calculatorState');
    if (calcData) {
      try {
        const parsed = JSON.parse(calcData);
        if (!customRate && parsed.calculatedRate) setHourlyRate(parsed.calculatedRate);
        if (parsed.billableHoursPerWeek) setWeeklyGoal(parsed.billableHoursPerWeek);
      } catch (e) {
        console.error(e);
      }
    }

    // Load saved schedule
    const saved = localStorage.getItem('schedulePlannerBlocks');
    if (saved) {
      try {
        setBlocks(JSON.parse(saved));
      } catch (e) {}
    } else {
      // Default template
      setBlocks([
        { id: '1', day: 0, startHour: 9, hours: 3, type: 'billable', label: 'Client Work' },
        { id: '2', day: 0, startHour: 13, hours: 2, type: 'admin', label: 'Emails & Admin' },
        { id: '3', day: 1, startHour: 9, hours: 4, type: 'billable', label: 'Deep Work' },
        { id: '4', day: 2, startHour: 10, hours: 3, type: 'billable', label: 'Client Meetings' },
        { id: '5', day: 3, startHour: 9, hours: 5, type: 'billable', label: 'Development' },
        { id: '6', day: 4, startHour: 9, hours: 3, type: 'billable', label: 'Client Work' },
        { id: '7', day: 4, startHour: 14, hours: 2, type: 'admin', label: 'Weekly Review' },
      ]);
    }
  }, []);

  const saveBlocks = (newBlocks: TimeBlock[]) => {
    setBlocks(newBlocks);
    localStorage.setItem('schedulePlannerBlocks', JSON.stringify(newBlocks));
  };

  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday

  const addBlock = () => {
    if (!newBlock.label) return;
    const block: TimeBlock = {
      id: Date.now().toString(),
      day: newBlock.day as number,
      startHour: newBlock.startHour as number,
      hours: newBlock.hours as number,
      type: newBlock.type as any,
      label: newBlock.label as string
    };
    saveBlocks([...blocks, block]);
    setIsAdding(false);
    setNewBlock({ ...newBlock, label: '' });
  };

  const removeBlock = (id: string) => {
    saveBlocks(blocks.filter(b => b.id !== id));
  };

  const billableHours = blocks.filter(b => b.type === 'billable').reduce((sum, b) => sum + b.hours, 0);
  const adminHours = blocks.filter(b => b.type === 'admin').reduce((sum, b) => sum + b.hours, 0);
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center">
            <CalendarIcon className="w-8 h-8 mr-3 text-purple-600" />
            Schedule Planner
          </h1>
          <p className="text-slate-500 mt-2">Visually block your week to ensure you hit your billable goals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-center">
          <div className="text-sm font-medium text-slate-500 mb-1">Billable Goal</div>
          <div className="flex items-baseline">
            <span className={`text-3xl font-bold ${billableHours >= weeklyGoal ? 'text-emerald-600' : 'text-slate-900'}`}>
              {billableHours}
            </span>
            <span className="text-slate-500 ml-2">/ {weeklyGoal} hrs</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
            <div className={`h-1.5 rounded-full ${billableHours >= weeklyGoal ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${Math.min((billableHours / weeklyGoal) * 100, 100)}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-center">
          <div className="text-sm font-medium text-slate-500 mb-1">Weekly Potential</div>
          <div className="text-3xl font-bold text-emerald-600">
            ${(billableHours * hourlyRate).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Based on ${hourlyRate}/hr</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-center md:col-span-2 relative overflow-hidden">
          <div className="flex h-full items-center justify-between z-10 relative">
            <div>
              <div className="text-sm font-medium text-slate-500 mb-1">Admin to Billable Ratio</div>
              <div className="text-xl font-bold text-slate-900 flex items-center">
                {Math.round((adminHours / (billableHours || 1)) * 100)}% Overhead
              </div>
              <div className="text-xs text-slate-500 mt-1">Target is &lt; 25%</div>
            </div>
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl shadow-sm transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-1" /> Add Block
            </button>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Clock className="w-24 h-24" />
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 grid grid-cols-1 md:grid-cols-6 gap-4 items-end animate-in fade-in slide-in-from-top-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-purple-800 mb-1">Label</label>
            <input type="text" value={newBlock.label} onChange={e => setNewBlock({...newBlock, label: e.target.value})} placeholder="e.g. Acme Project" className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-800 mb-1">Day</label>
            <select value={newBlock.day} onChange={e => setNewBlock({...newBlock, day: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-purple-200 rounded-lg outline-none">
              {days.map((d, i) => <option key={i} value={i}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-800 mb-1">Start Time</label>
            <select value={newBlock.startHour} onChange={e => setNewBlock({...newBlock, startHour: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-purple-200 rounded-lg outline-none">
              {Array.from({length: 16}).map((_, i) => <option key={i} value={i + 6}>{i + 6}:00</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-800 mb-1">Hours</label>
            <select value={newBlock.hours} onChange={e => setNewBlock({...newBlock, hours: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-purple-200 rounded-lg outline-none">
              {[1,2,3,4,5,6,7,8].map(h => <option key={h} value={h}>{h} h</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-800 mb-1">Type</label>
            <select value={newBlock.type} onChange={e => setNewBlock({...newBlock, type: e.target.value as any})} className="w-full px-3 py-2 border border-purple-200 rounded-lg outline-none">
              <option value="billable">Billable</option>
              <option value="admin">Admin</option>
              <option value="break">Break</option>
            </select>
          </div>
          <div className="md:col-span-6 flex justify-end space-x-3 mt-2">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
            <button onClick={addBlock} disabled={!newBlock.label} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors">Save Block</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50">
          <div className="p-3 text-center border-r border-slate-200 font-medium text-sm text-slate-500">
            Time
          </div>
          {days.map((day, i) => (
            <div key={day} className="p-3 text-center border-r border-slate-200 last:border-0 font-medium text-sm text-slate-700">
              {day}
              <div className="text-xs text-slate-400 font-normal">{format(addDays(currentWeekStart, i), 'd MMM')}</div>
            </div>
          ))}
        </div>

        <div className="relative" style={{ height: `${(20 - 6) * 60}px` }}>
          {/* Grid lines */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="absolute w-full border-t border-slate-100 flex pointer-events-none" style={{ top: `${i * 60}px` }}>
              <div className="w-[12.5%] text-xs text-slate-400 text-center -mt-2.5 bg-white mx-auto pr-2">{i + 6}:00</div>
              <div className="w-[87.5%] border-l border-slate-100"></div>
            </div>
          ))}

          {/* Vertical dividers */}
          <div className="absolute inset-0 flex pointer-events-none">
            <div className="w-[12.5%] h-full border-r border-slate-200"></div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-[12.5%] h-full border-r border-slate-100 last:border-0"></div>
            ))}
          </div>

          {/* Blocks */}
          {blocks.map(block => {
            const topOffset = (block.startHour - 6) * 60;
            const height = block.hours * 60;
            const leftOffset = 12.5 + (block.day * 12.5); // 1/8th per day
            
            let colorClasses = "";
            if (block.type === 'billable') colorClasses = "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200";
            if (block.type === 'admin') colorClasses = "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200";
            if (block.type === 'break') colorClasses = "bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200";

            return (
              <div 
                key={block.id}
                className={`absolute rounded-md border p-2 m-1 shadow-sm transition-all overflow-hidden group ${colorClasses}`}
                style={{
                  top: `${topOffset}px`,
                  height: `${height - 8}px`,
                  left: `${leftOffset}%`,
                  width: `calc(12.5% - 8px)`
                }}
              >
                <div className="font-bold text-xs truncate">{block.label}</div>
                <div className="text-[10px] opacity-75">{block.hours}h</div>
                
                <button 
                  onClick={() => removeBlock(block.id)}
                  className="absolute top-1 right-1 p-1 bg-white/50 hover:bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3 text-rose-500" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex gap-4 text-sm justify-center text-slate-500 pb-8">
        <div className="flex items-center"><div className="w-3 h-3 rounded bg-blue-100 border border-blue-300 mr-2"></div> Billable</div>
        <div className="flex items-center"><div className="w-3 h-3 rounded bg-purple-100 border border-purple-300 mr-2"></div> Admin</div>
        <div className="flex items-center"><div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 mr-2"></div> Break</div>
      </div>
    </div>
  );
};
