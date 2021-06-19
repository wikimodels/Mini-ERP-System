import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';

export function fillInActivityArrays(
  calendarDays: CalendarDay[]
): CalendarDay[][] {
  let superArray = [];
  let myDayActivityType: DayActivityType = calendarDays[0].dayActivityType;
  let myCalendarDays: CalendarDay[] = [];

  for (let i = 0; i < calendarDays.length; i++) {
    if (calendarDays[i].dayActivityType === myDayActivityType) {
      myCalendarDays.push(calendarDays[i]);
    } else {
      superArray.push(myCalendarDays);
      myDayActivityType = calendarDays[i].dayActivityType;
      myCalendarDays = [];
      i = i - 1;
    }
  }
  superArray.push(myCalendarDays);

  return superArray;
}
