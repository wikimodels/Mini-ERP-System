import { CalendarDay } from 'src/models/calendar-day.model';
import { DayActivityType } from 'src/models/day-activity-type.model';
import { DayMomentumType } from 'src/models/day-momentum-type.model copy';
import { addDaysBeforeCurrentMonth } from './add-days-before-current-month';
import { fillInCalendarDays } from './fill-in-calendar-days';

describe('Add Days before Current Month', () => {
  it('should add correct first gird day for January-01 (Friday)', () => {
    const beforeDayOfJanuary2021: CalendarDay = {
      dayActivityType: DayActivityType.NOT_DEFINED,
      dayMomentumType: DayMomentumType.BEFORE,
      dayNameLong: 'понедельник',
      dayNameShort: 'пн',
      dayNumber: 28,
      dayNumberStr: '28',
      dayOfWeek: 1,
      dayDateStr: '28 дек. 2020',
      dayCSS: 'day-before',
      monthNumber: 12,
    };
    let days = fillInCalendarDays(1, 2021);
    let calendarGrid = addDaysBeforeCurrentMonth(days, 1, 2021);
    expect(calendarGrid[0]).toEqual(beforeDayOfJanuary2021);
  });

  it('should add correct first grid day for March-01 (Monday)', () => {
    const beforeDayOfMarch2021: CalendarDay = {
      dayActivityType: DayActivityType.NOT_DEFINED,
      dayMomentumType: DayMomentumType.CURRENT,
      dayNameLong: 'понедельник',
      dayNameShort: 'пн',
      dayNumber: 1,
      dayNumberStr: '01',
      dayOfWeek: 1,
      dayDateStr: '01 мар. 2021',
      dayCSS: 'day-current',
      monthNumber: 3,
    };

    let days = fillInCalendarDays(3, 2021);

    let calendarGrid = addDaysBeforeCurrentMonth(days, 3, 2021);

    expect(calendarGrid[0]).toEqual(beforeDayOfMarch2021);
  });
});
