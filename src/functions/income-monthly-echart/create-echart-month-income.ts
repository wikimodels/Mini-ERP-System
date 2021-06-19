import * as _ from 'lodash';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';

import { EchartMonthIncome } from 'src/models/echart-income/echart-month-income.model';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';

export function createEchartMonthIncome(
  calendarMonth: CalendarMonth,
  monthIncomes: DayIncome[]
): EchartMonthIncome {
  const obj: EchartMonthIncome = {
    monthNumber: calendarMonth.monthNumber,
    monthNumberStr: calendarMonth.monthNumberStr,
    longMonthName: calendarMonth.longMonthName,
    shortMonthName: calendarMonth.shortMonthName,
    monthTotalMoney: monthIncomes.reduce((acc, value) => {
      acc = acc + value.incomeSum;
      return acc;
    }, 0),
    monthTotalOperations: monthIncomes.reduce((acc, value) => {
      acc = acc + 1;
      return acc;
    }, 0),
  };
  return obj;
}
