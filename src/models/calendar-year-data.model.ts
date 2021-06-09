import { CalendarYear } from './calendar-year/calendar-year.model';
import { IncomeType } from './income-yearly-report/income-type.model';

export interface CalendarYearData {
  calendarYear: CalendarYear;
  incomeTypes: IncomeType[];
}
