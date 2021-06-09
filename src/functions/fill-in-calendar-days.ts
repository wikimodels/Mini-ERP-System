import * as moment from 'moment';
import { addLeadingZero } from './add-leading-zero';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';
import { DayCSS } from 'src/models/enums/day-css.enum';
import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';

export function fillInCalendarDays(monthNum: number, yearNum: number) {
  const calendarDays: CalendarDay[] = [];
  const numberDaysInMonth = moment(
    `${yearNum}-${monthNum}`,
    'YYYY-MM'
  ).daysInMonth();
  for (let i = 1; i <= numberDaysInMonth; i++) {
    const date = `${yearNum}-${addLeadingZero(monthNum)}-${addLeadingZero(i)}`;

    const calendarDay: CalendarDay = {
      dayNameShort: moment(date).locale('ru').format('ddd'),
      dayNameLong: moment(date).locale('ru').format('dddd'),
      dayNumber: i,
      dayNumberStr: addLeadingZero(i),
      dayDateStr: moment(date).locale('ru').format('DD MMM YYYY'),
      dayOfWeek: moment(date).isoWeekday(),
      dayActivityType: DayActivityType.NOT_DEFINED,
      dayMomentumType: DayMomentumType.CURRENT,
      dayCSS: DayCSS.DAY_UNDEFINED,
      monthNumber: monthNum,
      yearNumber: yearNum,
      dayIncomes: [],
    };
    calendarDays.push(calendarDay);
  }
  return calendarDays;
}
