import { CalendarYearComponent } from 'src/app/calendar-line/calendar-year/calendar-year.component';
import { CalendarLine } from 'src/models/calendar-line';
import { CalendarYear } from 'src/models/calendar-year.model';
import { fillInCalendarYear } from './fill-in-calendar-year';

export function addYearToCalendarLine(
  yearNum: number,
  calendarLine: CalendarLine
): CalendarLine {
  const year: CalendarYear = fillInCalendarYear(yearNum);
  if (!calendarLine) {
    const years: CalendarYear[] = [];
    years.push(year);
    const calendarLine: CalendarLine = {
      calendarYears: years,
    };
    return calendarLine;
  }
  calendarLine.calendarYears.push(year);
  return calendarLine;
}
