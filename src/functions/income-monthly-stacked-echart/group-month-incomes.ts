import * as _ from 'lodash';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';

import { GrouppedMonthIncomeItem } from 'src/models/echart-income-stacked/groupped-month-income-item.model';
import { GrouppedMonthIncome } from 'src/models/echart-income-stacked/groupped-month-income.model';
import { getAllDayIncomesForMonth } from '../income-monthly-echart/get-all-day-incomes-for-month';

export function groupMonthIncomes(
  calendarMonth: CalendarMonth
): GrouppedMonthIncome {
  const monthIncomes = getAllDayIncomesForMonth(calendarMonth);

  const grouppedMonthIncomeItems: GrouppedMonthIncomeItem[] = _(monthIncomes)
    .groupBy((value) => value.incomeTypeName)
    .map((value, key) => {
      return {
        shortMonthName: calendarMonth.shortMonthName,
        incomeTypeName: key,
        incomeSum: value.reduce((acc, value) => {
          acc = acc + value.incomeSum;
          return acc;
        }, 0),
      };
    })
    .value();

  const grouppedMonthIncomeItem: GrouppedMonthIncome = {
    grouppedIncomes: grouppedMonthIncomeItems,
    monthNumberStr: calendarMonth.monthNumberStr,
    shortMonthName: calendarMonth.shortMonthName,
  };
  return grouppedMonthIncomeItem;
}
