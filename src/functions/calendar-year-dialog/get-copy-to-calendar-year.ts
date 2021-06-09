import { fillInCalendarYear } from 'src/functions/fill-in-calendar-year';
import { CalendarYear } from '../../models/calendar-year/calendar-year.model';

export function getCopyToCalendarYear(
  monthActivityStart: number,
  monthActivityEnd: number,
  yearNumber: number
): CalendarYear {
  const copyTo: CalendarYear = fillInCalendarYear(
    this.authService.getUserEmail(),
    monthActivityStart,
    monthActivityEnd,
    yearNumber
  );
  return copyTo;
}
