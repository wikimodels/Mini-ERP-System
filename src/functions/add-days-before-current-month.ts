import * as moment from 'moment';
import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';
import { DayCSS } from 'src/models/enums/day-css.enum';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';
import { addLeadingZero } from './add-leading-zero';

export function addDaysBeforeCurrentMonth(
  days: CalendarDay[],
  month: number,
  year: number
): CalendarDay[] {
  const firstDayOfMonthDate = `${year}-${addLeadingZero(month)}-${
    days[0].dayNumberStr
  }`;

  const firstDayOfWeek = days[0].dayOfWeek;

  for (let i = 0; i < firstDayOfWeek - 1; i++) {
    const dayBefore: CalendarDay = {
      yearNumber: year,
      dayNameShort: moment(firstDayOfMonthDate)
        .date(-i)
        .locale('ru')
        .format('ddd'),
      dayNameLong: moment(firstDayOfMonthDate)
        .date(-i)
        .locale('ru')
        .format('dddd'),
      dayNumberStr: addLeadingZero(moment(firstDayOfMonthDate).date(-i).date()),
      dayNumber: moment(firstDayOfMonthDate).date(-i).date(),
      dayOfWeek: moment(firstDayOfMonthDate).date(-i).isoWeekday(),
      dayDateStr: moment(firstDayOfMonthDate)
        .date(-i)
        .locale('ru')
        .format('DD MMM YYYY'),
      dayActivityType: DayActivityType.NOT_DEFINED,
      dayMomentumType: DayMomentumType.BEFORE,
      dayCSS: DayCSS.DAY_UNDEFINED,
      monthNumber: moment(firstDayOfMonthDate).subtract(1, 'day').month() + 1,
    };
    days.unshift(dayBefore);
  }

  console.log('BEFORE DAYS', days);
  return days;
}

export function getMonthNumber(data: string) {
  const monthNumber = moment(data).subtract(1, 'day').month('N');
}
