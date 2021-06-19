import { fillInCalendarYear } from 'src/functions/fill-in-calendar-year';
import { CalendarYear } from '../../models/calendar-year/calendar-year.model';

export function getCopyToCalendarYear(
  monthActivityStart: number,
  monthActivityEnd: number,
  yearNumber: number,
  email: string
): CalendarYear {
  const copyTo: CalendarYear = fillInCalendarYear(
    email,
    monthActivityStart,
    monthActivityEnd,
    yearNumber
  );
  return copyTo;
}
