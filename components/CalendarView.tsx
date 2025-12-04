import React, { useState, useEffect } from 'react';
import { generateMonthGrid } from '../services/calendarService';
import { CalendarDay } from '../types';

interface CalendarViewProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentDate, onDateSelect }) => {
  // Initialize displayDate based on currentDate
  const [displayDate, setDisplayDate] = useState(currentDate);
  const [days, setDays] = useState<CalendarDay[]>([]);

  // Update days when displayDate changes
  useEffect(() => {
    setDays(generateMonthGrid(displayDate.getFullYear(), displayDate.getMonth()));
  }, [displayDate]);

  // Sync displayDate if currentDate changes externally (e.g. from DailyDetail navigation)
  useEffect(() => {
    // Only update if the month/year is different to avoid jarring jumps if user is browsing other months
    if (currentDate.getMonth() !== displayDate.getMonth() || currentDate.getFullYear() !== displayDate.getFullYear()) {
      setDisplayDate(currentDate);
    }
  }, [currentDate]);

  const changeMonth = (delta: number) => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + delta, 1));
  };

  const changeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayDate(new Date(parseInt(event.target.value), displayDate.getMonth(), 1));
  };

  const changeMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayDate(new Date(displayDate.getFullYear(), parseInt(event.target.value), 1));
  };

  const weekDays = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

  return (
    <div className="bg-white rounded-t-xl shadow-lg border border-gray-200 overflow-hidden font-sans">
      {/* Controls Header */}
      <div className="bg-green-600 p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-white rounded-t-xl">
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between">
           <button onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-green-700 rounded-full transition bg-white/20">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
           </button>
           
           <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider flex items-center gap-2">
             <span className="hidden md:inline">THÁNG</span> {displayDate.getMonth() + 1} - {displayDate.getFullYear()}
           </h2>

           <button onClick={() => changeMonth(1)} className="p-1.5 hover:bg-green-700 rounded-full transition bg-white/20">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
           </button>
        </div>
        
        <div className="flex gap-2 text-gray-800 w-full md:w-auto">
           <div className="flex flex-1 gap-2">
             <select 
                value={displayDate.getMonth()} 
                onChange={changeMonthSelect}
                className="flex-1 px-3 py-1.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm font-medium"
              >
                {Array.from({length: 12}).map((_, i) => (
                  <option key={i} value={i}>Tháng {i + 1}</option>
                ))}
             </select>
             <select 
                value={displayDate.getFullYear()} 
                onChange={changeYear}
                className="flex-1 px-3 py-1.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm font-medium"
              >
                {Array.from({length: 20}).map((_, i) => (
                  <option key={i} value={displayDate.getFullYear() - 10 + i}>{displayDate.getFullYear() - 10 + i}</option>
                ))}
             </select>
           </div>
           <button 
             className="bg-green-800 text-white px-5 py-1.5 rounded-md font-bold text-sm hover:bg-green-900 transition shadow-sm" 
             onClick={() => setDisplayDate(new Date())}
           >
             XEM
           </button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
         {weekDays.map((day, idx) => (
           <div key={day} className={`py-3 text-center text-xs md:text-sm font-bold uppercase ${idx === 6 ? 'text-red-500' : 'text-gray-600'}`}>
             {day}
           </div>
         ))}
      </div>

      {/* Grid Body */}
      <div className="grid grid-cols-7 auto-rows-fr bg-white border-l border-gray-200">
        {days.map((day, idx) => {
          const isSelected = day.date.toDateString() === currentDate.toDateString();
          return (
            <div 
              key={idx} 
              onClick={() => onDateSelect(day.date)}
              className={`
                min-h-[80px] md:min-h-[110px] p-2 border-b border-r border-gray-200 relative cursor-pointer hover:bg-green-50 transition-all duration-200
                ${!day.isCurrentMonth ? 'bg-gray-50/60' : ''}
                ${isSelected ? 'bg-yellow-50 ring-inset ring-2 ring-yellow-400 z-10' : ''}
              `}
            >
              <div className="flex flex-col h-full justify-between items-center md:items-start">
                  {/* Solar Date */}
                  <div className={`text-xl md:text-3xl font-medium leading-none ${day.isWeekend ? 'text-red-500' : 'text-gray-800'} ${!day.isCurrentMonth ? 'opacity-30' : ''}`}>
                    {day.date.getDate()}
                  </div>

                  {/* Lunar Date */}
                  <div className={`text-[10px] md:text-sm font-medium mt-1 ${day.lunar.day === 1 || day.lunar.day === 15 ? 'text-red-500' : 'text-gray-500'} ${!day.isCurrentMonth ? 'opacity-30' : ''}`}>
                     {day.lunar.day === 1 ? `${day.lunar.day}/${day.lunar.month}` : day.lunar.day}
                  </div>
              </div>

              {/* Special Events text */}
              {(day.lunar.day === 1 || day.lunar.day === 15) && day.isCurrentMonth && (
                 <div className="hidden md:block absolute bottom-1 left-0 w-full text-center">
                    <span className="text-[10px] text-red-500 font-semibold bg-red-50 px-1 rounded">
                      {day.lunar.day === 1 ? 'Mùng 1' : 'Rằm'}
                    </span>
                 </div>
              )}
              
              {/* Today Marker */}
              {day.isToday && (
                <div className="absolute top-2 right-2 flex flex-col items-end">
                   <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Hôm nay</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
