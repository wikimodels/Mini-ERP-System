import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { MonthSettings } from 'src/models/month-settings.model';

export function setCalenarYearsTaxesParams(
  months: MonthSettings,
  calendarYear: CalendarYear
): CalendarYear {
  calendarYear.calendarMonths.forEach((value, index) => {
    calendarYear.calendarMonths[index].monthSettings = months[index];
  });
  return calendarYear;
}
