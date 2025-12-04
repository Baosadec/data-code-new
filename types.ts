export enum ViewState {
  HOME = 'HOME',
  CALENDAR = 'CALENDAR',
  ASSISTANT = 'ASSISTANT',
  BLOG = 'BLOG',
  KNOWLEDGE = 'KNOWLEDGE',
  LOVE = 'LOVE'
}

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  leap: boolean;
  dayName: string; // e.g., Giáp Tý
  monthName: string; // e.g., Bính Dần
  yearName: string; // e.g. Ất Tỵ
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  lunar: LunarDate;
  events?: string[];
  isWeekend: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
