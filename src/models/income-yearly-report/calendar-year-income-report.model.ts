import { CalendarMonthIncomeReport } from './calendar-month-income-report.model';

export interface CalendarYearIncomeReport {
  yearNumber: number;
  yearIncomeTotal: number;
  monthActivityStart: number;
  monthActivityEnd: number;
  monthsIncomeReports: CalendarMonthIncomeReport[];
}
