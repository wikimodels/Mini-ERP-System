import { CalendarDayIncomeReport } from './calendar-day-income-report.model';

export interface CalendarMonthIncomeReport {
  longMonthName: string;
  shortMonthName: string;
  monthNumberStr: string;
  daysInMonth: number;
  monthNumber: number;
  monthIncomeTotal: number;
  daysIncomeRecords: CalendarDayIncomeReport[];
}
