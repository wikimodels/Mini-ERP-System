import { CalendarMonth } from 'src/models/calendar-month.model';
import { CalendarYear } from 'src/models/calendar-year.model';
import { copyCalendarYear } from './copy-calendaer-year';

export function getCalendarMonthsOutOfCopyRange(
  copyFrom: CalendarYear,
  copyTo: CalendarYear
) {
  const outOfCopyRange: CalendarMonth[] = [];
  copyFrom.calendarMonths.forEach((copyFromMonth) => {
    const copyFromIndex = copyTo.calendarMonths.findIndex(
      (month) => month.monthNumber === copyFromMonth.monthNumber
    );
    if (copyFromIndex === -1) {
      outOfCopyRange.push(copyFromMonth);
    }
  });
  return outOfCopyRange;
}
