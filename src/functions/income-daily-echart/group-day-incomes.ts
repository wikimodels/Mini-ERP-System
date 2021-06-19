import * as _ from 'lodash';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';

import { EchartDayIncome } from 'src/models/echart-income/echart-day-income.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';

export function groupDayIncomes(
  calendarMonth: CalendarMonth
): EchartDayIncome[] {
  const dayIncomes: EchartDayIncome[] = [];
  calendarMonth.calendarDays.forEach((d) => {
    if (d.dayActivityType === DayActivityType.WORKING) {
      const obj: EchartDayIncome = {
        dayNumberStr: d.dayDateStr.slice(0, 2),
        dayNumber: d.dayNumber,
        dayTotalMoney: d.dayIncomes.reduce((acc, value) => {
          acc = acc + value.incomeSum;
          return acc;
        }, 0),
        dayTotalOperations: d.dayIncomes.reduce((acc, value) => {
          acc = acc + 1;
          return acc;
        }, 0),
      };
      dayIncomes.push(obj);
    }
  });
  return dayIncomes;
}
