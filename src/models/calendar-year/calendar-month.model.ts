import { MonthSettings } from '../month-settings.model';
import { CalendarDay } from './calendar-day.model';

export interface CalendarMonth {
  longMonthName: string;
  shortMonthName: string;
  monthNumberStr: string;
  daysInMonth: number;
  monthNumber: number;
  calendarDays: CalendarDay[];
  monthSettings: MonthSettings;
}
