import { CalendarMonth } from 'src/models/calendar-month.model';
import * as _ from 'lodash';
import { DayActivityType } from 'src/models/day-activity-type.model';
import { GrouppedDayIncomeItem } from 'src/models/echart-income-stacked/groupped-day-income-item.model';
import { GrouppedDayIncome } from 'src/models/echart-income-stacked/groupped-day-income.model';

export function groupDayIncomes(
  calendarMonth: CalendarMonth
): GrouppedDayIncome[] {
  const grouppedDayIncomes: GrouppedDayIncome[] = calendarMonth.calendarDays.reduce(
    (acc, day) => {
      if (day.dayActivityType === DayActivityType.WORKING) {
        const grouppedIncomes: GrouppedDayIncomeItem[] = _(day.dayIncomes)
          .groupBy((day) => day.incomeTypeName)
          .map((value, key) => {
            return {
              dayNumberStr: day.dayNumberStr,
              incomeTypeName: key,
              incomeSum: _(value).sumBy((d) => d.incomeSum),
            };
          })
          .value();
        const obj = {
          dayNumberStr: day.dayNumberStr,
          grouppedIncomes: grouppedIncomes,
        };
        acc.push(obj);
      }
      return acc;
    },
    []
  );

  return grouppedDayIncomes;
}
