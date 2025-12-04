import React from 'react';
import { getDayInfo } from '../services/calendarService';

interface DailyDetailProps {
  date: Date;
  onNext: () => void;
  onPrev: () => void;
  onViewCalendar: () => void;
}

const DailyDetail: React.FC<DailyDetailProps> = ({ date, onNext, onPrev, onViewCalendar }) => {
  const info = getDayInfo(date);

  const weekDayName = new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(date);
  
  return (
    <div className="bg-white rounded-t-xl shadow-lg overflow-hidden border border-gray-200 mb-8 font-sans">
      {/* Header */}
      <div className="bg-green-600 px-4 py-3 flex justify-between items-center text-white rounded-t-xl">
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide flex items-center gap-2">
          LỊCH VẠN NIÊN
        </h2>
        <button 
          onClick={onViewCalendar}
          className="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Xem nhanh theo ngày
        </button>
      </div>

      <div className="p-0">
        <div className="flex flex-col md:flex-row relative">
            
            {/* Left Column: Dương Lịch */}
            <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative">
               <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-green-100 text-green-600 flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
               </button>
               
               <div className="text-gray-500 font-semibold text-lg uppercase tracking-widest mb-4">Dương Lịch</div>
               <div className="text-[120px] leading-none font-bold text-green-600 tracking-tighter transform scale-y-110 mb-2">
                 {info.gregorian.getDate()}
               </div>
               <div className="text-xl text-gray-600 font-medium">
                 Tháng {info.gregorian.getMonth() + 1} năm {info.gregorian.getFullYear()}
               </div>
               <div className="mt-2 text-green-600 font-bold text-2xl capitalize">{weekDayName}</div>
            </div>

            {/* Right Column: Âm Lịch */}
            <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center relative bg-gray-50/30">
               <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-green-100 text-green-600 flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
               </button>

               <div className="text-gray-500 font-semibold text-lg uppercase tracking-widest mb-4">Âm lịch</div>
               <div className="text-[120px] leading-none font-bold text-gray-800 tracking-tighter transform scale-y-110 mb-2">
                 {info.lunar.day}
               </div>
               <div className="text-xl text-gray-600 font-medium text-center">
                 Tháng {info.lunar.month} năm {info.lunar.yearName}
               </div>
               {/* Special Event Placeholder */}
               <div className="mt-2 text-red-500 font-bold text-lg min-h-[28px]">
                  {info.lunar.day === 1 ? 'Ngày Mồng 1' : info.lunar.day === 15 ? 'Ngày Rằm' : ''}
               </div>
            </div>
        </div>

        {/* Info Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="grid gap-4 text-sm md:text-base">
            <div className="flex flex-col sm:flex-row sm:items-baseline">
               <span className="font-bold text-gray-900 w-36 shrink-0">Mệnh ngày:</span>
               <span className="text-gray-700">{info.element}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
               <span className="font-bold text-gray-900 w-36 shrink-0">Giờ hoàng đạo:</span>
               <span className="text-gray-700 leading-relaxed">{info.zodiacHours}</span>
            </div>
             <div className="flex flex-col sm:flex-row sm:items-baseline">
               <span className="font-bold text-gray-900 w-36 shrink-0">Tuổi xung:</span>
               <span className="text-gray-700">{info.conflictingAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDetail;
