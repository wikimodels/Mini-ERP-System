import { CalendarYear } from '../calendar-year/calendar-year.model';
import { DayIncome } from './day-income.model';
import { IncomeType } from './income-type.model';

export interface CalendarIncomeDialogRecord {
  title: string;
  dayNumber: number;
  monthNumber: number;
  yearNumber: number;
  calendarYear?: CalendarYear;
  date: string;
  incomeTypes?: IncomeType[];
  dayIncome?: DayIncome;
}
