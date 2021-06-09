import { CalendarDay } from 'src/models/calendar-day.model';
import { DayActivityType } from 'src/models/day-activity-type.model';
import { DayCSS } from 'src/models/day-css.model';
import { DayMomentumType } from 'src/models/day-momentum-type.model copy';
import { addDaysAfterCurrentMonth } from './add-days-after-current-month';

import { fillInCalendarDays } from './fill-in-calendar-days';

describe('Add Days after Current Month', () => {
  it('should add correct days after January-01 (Friday) 2021', () => {
    const afterDayOfJanuary2021: CalendarDay = {
      dayNameShort: 'вс',
      dayNameLong: 'воскресенье',
      dayNumber: 31,
      dayNumberStr: '31',
      dayDateStr: '31 янв. 2021',
      dayOfWeek: 7,
      yearNumber: 2021,
      dayActivityType: DayActivityType.NOT_DEFINED,
      dayMomentumType: DayMomentumType.CURRENT,
      dayCSS: DayCSS.DAY_WORKING,
      monthNumber: 1,
      dayIncomes: [
        {
          id: 'number31',
          docNumber: '',
          incomeSum: 20000,
          incomeTypeName: 'наличные',
          dayDateStr: '31 янв. 2021',
          dayCSS: 'day-current',
        },
        {
          id: 'number311',
          docNumber: '00000000001235',
          incomeSum: 20000,
          incomeTypeName: 'наличные',
          dayDateStr: '31 янв. 2021',
          dayCSS: 'day-current',
        },
        {
          id: 'number312',
          docNumber: '00000000001234',
          incomeSum: 20000,
          incomeTypeName: 'наличные',
          dayDateStr: '31 янв. 2021',
          dayCSS: 'day-current',
        },
      ],
    };

    let days = fillInCalendarDays(1, 2021);
    let calendarGrid = addDaysAfterCurrentMonth(days, 1, 2021);
    expect(calendarGrid[calendarGrid.length - 1]).toEqual(
      afterDayOfJanuary2021
    );
  });

  it('should add correct last day for March-grid (April-04, Monday)', () => {
    const afterDayOfMarch2021: CalendarDay = {
      dayNameShort: 'вс',
      dayNameLong: 'воскресенье',
      dayNumberStr: '04',
      dayNumber: 4,
      dayOfWeek: 7,
      dayActivityType: DayActivityType.NOT_DEFINED,
      dayDateStr: '04 апр. 2021',
      dayMomentumType: DayMomentumType.AFTER,
      dayCSS: DayCSS.DAY_UNDEFINED,
      monthNumber: 4,
      yearNumber: 2021,
    };
    let days = fillInCalendarDays(3, 2021);
    let calendarGrid = addDaysAfterCurrentMonth(days, 3, 2021);
    expect(calendarGrid[calendarGrid.length - 1]).toEqual(afterDayOfMarch2021);
  });
});
