import * as moment from 'moment';
import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';
import { DayCSS } from 'src/models/enums/day-css.enum';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';
import { addLeadingZero } from './add-leading-zero';

export function addDaysAfterCurrentMonth(
  days: CalendarDay[],
  month: number,
  year: number
): CalendarDay[] {
  const lastDayOfMonthDate = `${year}-${addLeadingZero(month)}-${
    days[days.length - 1].dayNumberStr
  }`;

  const lastDayOfWeek = days[days.length - 1].dayOfWeek;
  console.log('first day of week', lastDayOfWeek);

  for (let i = 1; i <= 7 - lastDayOfWeek; i++) {
    const dayAfter: CalendarDay = {
      dayNameShort: moment(lastDayOfMonthDate)
        .add(i, 'days')
        .locale('ru')
        .format('ddd'),
      dayNameLong: moment(lastDayOfMonthDate)
        .add(i, 'days')
        .locale('ru')
        .format('dddd'),
      dayNumberStr: addLeadingZero(
        moment(lastDayOfMonthDate).add(i, 'days').date()
      ),
      dayNumber: moment(lastDayOfMonthDate).add(i, 'days').date(),
      dayOfWeek: moment(lastDayOfMonthDate).add(i, 'days').isoWeekday(),
      dayActivityType: DayActivityType.NOT_DEFINED,
      dayDateStr: moment(lastDayOfMonthDate)
        .add(i, 'days')
        .locale('ru')
        .format('DD MMM YYYY'),
      dayMomentumType: DayMomentumType.AFTER,
      dayCSS: DayCSS.DAY_UNDEFINED,
      monthNumber: moment(lastDayOfMonthDate).add(1, 'M').month() + 1,
      yearNumber: year,
    };
    days.push(dayAfter);
  }
  console.log('AFTER DAYS', days);
  return days;
}
