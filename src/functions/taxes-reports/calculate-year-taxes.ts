import { CalendarYear } from 'src/models/calendar-year.model';
import { IMonthTaxesReport } from 'src/models/taxes-report/i-month-taxes-report.model.';
import { IYearTaxesReport } from 'src/models/taxes-report/i-year-taxes-report.model';
import { YearTaxesReport } from 'src/models/taxes-report/year-taxes-report.model';

export function calculateYearTaxes(calendarYear: CalendarYear) {
  const yearTaxes: IYearTaxesReport = new YearTaxesReport(calendarYear).report;
  return yearTaxes;
}
