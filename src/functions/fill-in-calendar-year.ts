import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { fillInCalendarMonths } from './fill-in-calendar-months';

export function fillInCalendarYear(
  email: string,
  monthActivityStart: number,
  monthActivityEnd: number,
  yearNumber: number
): CalendarYear {
  const year: CalendarYear = {
    yearNumber: yearNumber,
    email: email,
    monthActivityStart: monthActivityStart,
    monthActivityEnd: monthActivityEnd,
    markedForDeletion: false,
    calendarMonths: fillInCalendarMonths(
      monthActivityStart,
      monthActivityEnd,
      yearNumber
    ),
  };
  return year;
}
