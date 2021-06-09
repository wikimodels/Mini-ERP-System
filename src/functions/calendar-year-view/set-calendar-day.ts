import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';

export function setCalendarDay(
  dayNumber: number,
  monthNumber: number,
  calendarYear: CalendarYear,
  calendarDay: CalendarDay
) {
  let monthIndex;
  let dayIndex;

  monthIndex = calendarYear.calendarMonths.findIndex(
    (m) => m.monthNumber == monthNumber
  );

  if (monthIndex > -1) {
    dayIndex = calendarYear.calendarMonths[monthIndex].calendarDays.findIndex(
      (d) =>
        d.dayNumber == dayNumber &&
        d.dayMomentumType === DayMomentumType.CURRENT
    );

    if (dayIndex > -1) {
      calendarYear.calendarMonths[monthIndex].calendarDays[dayIndex] =
        calendarDay;
    }
  }

  return calendarYear;
}
