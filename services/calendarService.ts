import { CalendarDay, LunarDate } from '../types';

// Helper to format date strings
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' }).format(date);
};

// SIMULATED Lunar Date conversion
const getLunarDate = (date: Date): LunarDate => {
  // Approximate offset for demo purposes (Lunar is roughly ~1 month behind)
  const lunarOffsetTime = date.getTime() - (29 * 24 * 60 * 60 * 1000) - (12 * 24 * 60 * 60 * 1000); 
  const d = new Date(lunarOffsetTime);
  
  const stems = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const branches = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  const dayIndex = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
  const dayName = `${stems[dayIndex % 10]} ${branches[dayIndex % 12]}`;
  const monthName = `${stems[(d.getMonth() + 2) % 10]} ${branches[(d.getMonth() + 2) % 12]}`;
  
  // Approximate year name logic
  const yearOffset = d.getFullYear() - 4; 
  const yearName = `${stems[yearOffset % 10]} ${branches[yearOffset % 12]}`;

  return {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
    leap: false,
    dayName: dayName,
    monthName: monthName,
    yearName: yearName
  };
};

export const generateMonthGrid = (year: number, month: number): CalendarDay[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Mon=0, Sun=6
  
  const days: CalendarDay[] = [];
  
  // Previous month fill
  for (let i = startDayOfWeek; i > 0; i--) {
    const d = new Date(year, month, 1 - i);
    days.push({
      date: d,
      isCurrentMonth: false,
      isToday: isSameDay(d, new Date()),
      lunar: getLunarDate(d),
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    });
  }

  // Current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      date: d,
      isCurrentMonth: true,
      isToday: isSameDay(d, new Date()),
      lunar: getLunarDate(d),
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    });
  }

  // Next month fill to complete 42 cells (6 rows)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    days.push({
      date: d,
      isCurrentMonth: false,
      isToday: isSameDay(d, new Date()),
      lunar: getLunarDate(d),
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    });
  }

  return days;
};

const isSameDay = (d1: Date, d2: Date) => {
  return d1.getDate() === d2.getDate() && 
         d1.getMonth() === d2.getMonth() && 
         d1.getFullYear() === d2.getFullYear();
};

// Deterministic data generation based on date to avoid random changes on re-render
export const getDayInfo = (date: Date) => {
   const lunar = getLunarDate(date);
   const dayIndex = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
   
   const elements = [
     "Hải Trung Kim - Ngày hoàng đạo", 
     "Lư Trung Hỏa - Ngày hắc đạo", 
     "Đại Lâm Mộc - Ngày bình thường", 
     "Lộ Bàng Thổ - Ngày hoàng đạo", 
     "Kiếm Phong Kim - Ngày hắc đạo"
   ];
   
   const zodiacs = [
     "Tý (23-1), Dần (3-5), Mão (5-7), Ngọ (11-13), Mùi (13-15), Dậu (17-19)",
     "Sửu (1-3), Thìn (7-9), Tỵ (9-11), Mùi (13-15), Tuất (19-21), Hợi (21-23)",
     "Dần (3-5), Thìn (7-9), Tỵ (9-11), Thân (15-17), Dậu (17-19), Hợi (21-23)"
   ];
   
   const conflicts = [
     "Canh Dần, Giáp Dần",
     "Nhâm Tý, Bính Tý",
     "Mậu Ngọ, Canh Ngọ",
     "Đinh Mão, Tân Mão"
   ];

   return {
     gregorian: date,
     lunar: lunar,
     zodiacHours: zodiacs[dayIndex % zodiacs.length],
     element: elements[dayIndex % elements.length],
     conflictingAge: conflicts[dayIndex % conflicts.length]
   };
};
