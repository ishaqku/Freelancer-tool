import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Calendar, AlertTriangle, Coffee, BookOpen } from 'lucide-react';

interface ScheduleVisualizerProps {
  billableHoursPerWeek: number;
  nonBillablePercent: number;
}

export const ScheduleVisualizer: React.FC<ScheduleVisualizerProps> = ({ 
  billableHoursPerWeek, nonBillablePercent 
}) => {
  const totalHours = Math.round(billableHoursPerWeek / (1 - nonBillablePercent / 100));
  const nonBillableHours = totalHours - billableHoursPerWeek;
  
  const dailyTotal = totalHours / 5;
  const breakTime = 1.5; // Fixed daily break assumption
  
  const widthPercents = {
     billable: (billableHoursPerWeek / (totalHours + 5 * breakTime)) * 100,
     admin: (nonBillableHours / (totalHours + 5 * breakTime)) * 100,
     breaks: ((5 * breakTime) / (totalHours + 5 * breakTime)) * 100
  };

  const getDaySchedule = (dayIndex: number) => {
     let billable = dailyTotal * (1 - nonBillablePercent / 100);
     let nonBillable = dailyTotal * (nonBillablePercent / 100);
     
     // Distribute admin differently to make it look realistic
     if (dayIndex === 4) { // Friday
        billable -= 1;
        nonBillable += 1;
     } else if (dayIndex === 0) { // Monday
        nonBillable += 0.5;
        billable -= 0.5;
     }
     
     return [
       { type: 'client', label: 'Client Work', hours: (billable * 0.6).toFixed(1) },
       { type: 'break', label: 'Lunch Break', hours: '1.0' },
       { type: 'client', label: 'Client Work', hours: (billable * 0.4).toFixed(1) },
       { type: 'break', label: 'Short Break', hours: '0.5' },
       { type: 'admin', label: 'Admin & Learn', hours: nonBillable.toFixed(1) }
     ];
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
      <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="text-lg flex items-center">
           <Calendar className="w-5 h-5 mr-2 text-slate-700" />
           Your Ideal Freelance Week
        </CardTitle>
        <CardDescription>Visualizing your {totalHours} hour work week based on your inputs.</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        
        {/* Weekly Summary Bar */}
        <div className="space-y-2">
           <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
              <span>Weekly Distribution (inc. breaks)</span>
           </div>
           
           <div className="h-4 w-full flex rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer" 
                style={{ width: `${widthPercents.billable}%` }} 
                title={`Billable: ${billableHoursPerWeek} hrs`}
              />
              <div 
                className="bg-purple-400 hover:bg-purple-500 transition-colors cursor-pointer" 
                style={{ width: `${widthPercents.admin}%` }} 
                title={`Admin/Learning: ${nonBillableHours} hrs`}
              />
              <div 
                className="bg-amber-100 hover:bg-amber-200 transition-colors cursor-pointer" 
                style={{ width: `${widthPercents.breaks}%` }}
                title={`Breaks: ${5 * breakTime} hrs`}
              />
           </div>
           
           <div className="flex justify-between md:justify-start md:space-x-6 text-xs text-slate-600 pt-1">
              <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"/> Billable: {billableHoursPerWeek}h</span>
              <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-purple-400 mr-1"/> Admin/Learn: {nonBillableHours}h</span>
              <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-amber-100 border border-amber-200 mr-1"/> Breaks: {5 * breakTime}h</span>
           </div>
        </div>
        
        {totalHours > 50 && (
           <div className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
             <AlertTriangle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
             <div>Your total weekly hours ({totalHours}h) are in the burnout danger zone. Consider raising your rates and working fewer billable hours.</div>
           </div>
        )}

        <div className="space-y-4">
           {days.map((day, idx) => (
             <div key={day} className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-24 text-sm font-semibold text-slate-700 shrink-0 mb-2 sm:mb-0">{day}</div>
                <div className="flex-1 flex gap-1 h-8 rounded overflow-hidden shadow-sm shadow-slate-100">
                   {getDaySchedule(idx).map((block, bIdx) => (
                      <div 
                        key={bIdx}
                        className={`flex items-center justify-center text-[10px] font-medium transition-all hover:brightness-95 ${
                           block.type === 'client' ? 'bg-blue-500 text-white' :
                           block.type === 'admin' ? 'bg-purple-300 text-purple-900' :
                           'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}
                        style={{ flexBasis: `${parseFloat(block.hours) * 15}%` }}
                        title={`${block.label} (${block.hours} hrs)`}
                      >
                         <span className="hidden md:inline truncate px-1">{block.label}</span>
                         <span className="md:hidden truncate">{block.hours}h</span>
                      </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
           <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden group">
              <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform">
                <BookOpen className="w-16 h-16" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-1">Learning Time</h4>
              <p className="text-sm text-slate-600">Block 2 hours on Friday afternoons for upskilling instead of cramming it into evenings.</p>
           </div>
           
           <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden group">
               <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform">
                <Coffee className="w-16 h-16" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-1">Deep Work</h4>
              <p className="text-sm text-slate-600">You have enough hours to block entire mornings for deep work. Move client calls to Mon/Wed afternoons.</p>
           </div>
        </div>

      </CardContent>
    </Card>
  );
};
