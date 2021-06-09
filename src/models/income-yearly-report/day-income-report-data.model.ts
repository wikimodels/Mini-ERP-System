import { CalendarYear } from '../calendar-year/calendar-year.model';
import { IncomeType } from './income-type.model';

export interface DayIncomeReportData {
  calendarYear: CalendarYear;
  incomeTypes: IncomeType[];
}
