import * as _ from 'lodash';

import { CalendarYear } from 'src/models/calendar-year.model';
import { DayActivityType } from 'src/models/day-activity-type.model';

export function getYearIncomeTypeNames(calendarYear: CalendarYear): string[] {
  const typeNames: string[] = [];
  calendarYear.calendarMonths.forEach((month) => {
    month.calendarDays.forEach((day) => {
      if (day.dayActivityType === DayActivityType.WORKING) {
        day.dayIncomes.forEach((income) => {
          typeNames.push(income.incomeTypeName);
        });
      }
    });
  });

  return _.uniq(typeNames);
}
