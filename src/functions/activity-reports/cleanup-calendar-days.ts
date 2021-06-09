import { CalendarDay } from 'src/models/calendar-day.model';
import { CalendarYear } from 'src/models/calendar-year.model';
import { DayMomentumType } from 'src/models/day-momentum-type.model copy';

export function cleanupCalendarDays(calendarYear: CalendarYear): CalendarDay[] {
  let calendarDays: CalendarDay[] = [];
  calendarYear.calendarMonths.forEach((month) => {
    month.calendarDays.forEach((day) => {
      if (day.dayMomentumType === DayMomentumType.CURRENT) {
        calendarDays.push(day);
      }
    });
  });
  return calendarDays;
}
