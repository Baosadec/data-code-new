import React, { useState } from 'react';
import Navigation from './components/Navigation';
import DailyDetail from './components/DailyDetail';
import CalendarView from './components/CalendarView';
import Assistant from './components/Assistant';
import LoveFortune from './components/LoveFortune';
import Blog from './components/Blog';
import Knowledge from './components/Knowledge';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to navigate dates
  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
      case ViewState.CALENDAR:
        return (
          <div className="space-y-8 animate-fade-in">
            <DailyDetail 
              date={selectedDate} 
              onNext={() => handleDateChange(1)}
              onPrev={() => handleDateChange(-1)}
              onViewCalendar={() => {
                const calElement = document.getElementById('calendar-view');
                if (calElement) calElement.scrollIntoView({ behavior: 'smooth' });
                else if (currentView !== ViewState.CALENDAR) setCurrentView(ViewState.CALENDAR);
              }}
            />
            <div id="calendar-view">
              <CalendarView 
                currentDate={selectedDate} 
                onDateSelect={setSelectedDate} 
              />
            </div>
          </div>
        );
      case ViewState.ASSISTANT:
        return <Assistant />;
      case ViewState.LOVE:
        return <LoveFortune />;
      case ViewState.BLOG:
        return <Blog />;
      case ViewState.KNOWLEDGE:
        return <Knowledge />;
      default:
        return <div>Trang không tồn tại</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 pb-12">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-8">
         <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
           <p className="mb-2">© 2024 Lịch Vạn Niên & Trợ Lý AI.</p>
           <p className="text-xs text-gray-400">Thiết kế giao diện hiện đại, trải nghiệm mượt mà.</p>
           <div className="flex justify-center space-x-6 mt-4 font-medium text-gray-600">
             <span className="hover:text-green-600 cursor-pointer transition-colors">Điều khoản</span>
             <span className="hover:text-green-600 cursor-pointer transition-colors">Bảo mật</span>
             <span className="hover:text-green-600 cursor-pointer transition-colors">Liên hệ</span>
           </div>
         </div>
      </footer>
    </div>
  );
};

export default App;
