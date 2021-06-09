import * as moment from 'moment';

import { addLeadingZero } from './add-leading-zero';
import { createCalendarDaysGrid } from './create-calendar-month-grid';
import * as defaults from '../assets/utils/defaults.json';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';

export function fillInCalendarMonths(
  monthActivityStart: number,
  monthActivityEnd: number,
  yearNumber: number
): CalendarMonth[] {
  const calendarMonths: CalendarMonth[] = [];
  for (let i = monthActivityStart; i <= monthActivityEnd; i++) {
    const month: CalendarMonth = {
      longMonthName: moment(i, 'MM').locale('ru').format('MMMM'),
      shortMonthName: moment(i, 'MM').locale('ru').format('MMM'),
      daysInMonth: moment(`${yearNumber}-${addLeadingZero(i)}`).daysInMonth(),
      calendarDays: createCalendarDaysGrid(i, yearNumber),
      monthNumber: i,
      monthNumberStr: addLeadingZero(i),
      monthSettings: {
        longMonthName: moment(i, 'MM').locale('ru').format('MMMM'),
        income: defaults.workingMonthSettings.income,
        pensionTaxRate: defaults.workingMonthSettings.pensionTaxRate,
        socialTaxRate: defaults.workingMonthSettings.socialTaxRate,
      },
    };
    calendarMonths.push(month);
  }
  console.log('CALENDAR MONTH', calendarMonths);
  return calendarMonths;
}
