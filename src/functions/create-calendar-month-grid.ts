import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { addDaysAfterCurrentMonth } from './add-days-after-current-month';
import { addDaysBeforeCurrentMonth } from './add-days-before-current-month';
import { fillInCalendarDays } from './fill-in-calendar-days';

export function createCalendarDaysGrid(
  monthNum: number,
  year: number
): CalendarDay[] {
  let days = fillInCalendarDays(monthNum, year);
  days = addDaysBeforeCurrentMonth(days, monthNum, year);
  days = addDaysAfterCurrentMonth(days, monthNum, year);
  return days;
}
