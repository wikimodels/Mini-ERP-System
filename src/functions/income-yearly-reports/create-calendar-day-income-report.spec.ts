import { CalendarDay } from 'src/models/calendar-day.model';
import { CalendarMonth } from 'src/models/calendar-month.model';
import { DayActivityType } from 'src/models/day-activity-type.model';
import { DayCSS } from 'src/models/day-css.model';
import { DayMomentumType } from 'src/models/day-momentum-type.model copy';
import { CalendarDayIncomeReport } from 'src/models/income-yearly-report/calendar-day-income-report.model';

import { createCalendarDayIncomeReport } from './create-calendar-day-income-report';

describe('Create-Calendar-Day-Income-Report', () => {
  const calendarDay: CalendarDay = {
    yearNumber: 2020,
    dayNameShort: 'пт',
    dayNameLong: 'пятница',
    dayNumber: 31,
    dayNumberStr: '31',
    dayDateStr: '31 янв. 2020',
    dayOfWeek: 5,
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
        dayDateStr: '31 янв. 2020',
        dayCSS: 'day-current',
      },
      {
        id: 'number311',
        docNumber: '00000000001235',
        incomeSum: 20000,
        incomeTypeName: 'наличные',
        dayDateStr: '31 янв. 2020',
        dayCSS: 'day-current',
      },
      {
        id: 'number312',
        docNumber: '00000000001234',
        incomeSum: 20000,
        incomeTypeName: 'наличные',
        dayDateStr: '31 янв. 2020',
        dayCSS: 'day-current',
      },
    ],
  };
  beforeEach(() => {});
  it('should correctly summarize day incomes ', () => {
    const dayIncomeReport: CalendarDayIncomeReport =
      createCalendarDayIncomeReport(calendarDay);
    expect(dayIncomeReport.dayIncomeTotal).toEqual(60000);
    expect(dayIncomeReport.DayIncomeRecordDialogs.length).toEqual(3);
    expect(dayIncomeReport.DayIncomeRecordDialogs[0].incomeSum).toEqual(20000);
    expect(dayIncomeReport.DayIncomeRecordDialogs[1].incomeSum).toEqual(20000);
    expect(dayIncomeReport.DayIncomeRecordDialogs[2].incomeSum).toEqual(20000);
    expect(dayIncomeReport.dayNumberStr).toEqual('31');
    expect(dayIncomeReport.dayNameShort).toEqual('пт');
    expect(dayIncomeReport.dayNumber).toEqual(31);
    expect(dayIncomeReport.monthNumber).toEqual(1);
  });
});
