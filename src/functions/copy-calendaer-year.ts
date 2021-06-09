import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

export function copyCalendarYear(
  copyFrom: CalendarYear,
  copyTo: CalendarYear
): CalendarYear {
  copyTo.id = copyFrom.id;
  copyTo.calendarMonths.forEach((copyToMonth, copyToIndex) => {
    const copyFromIndex = copyFrom.calendarMonths.findIndex(
      (copyFromMonth) => copyFromMonth.monthNumber === copyToMonth.monthNumber
    );
    if (copyFromIndex > -1) {
      copyTo.calendarMonths[copyToIndex] =
        copyFrom.calendarMonths[copyFromIndex];
    }
  });
  return copyTo;
}
