import { CalendarDay } from 'src/models/calendar-day.model';
import { DayActivityType } from 'src/models/day-activity-type.model';

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
