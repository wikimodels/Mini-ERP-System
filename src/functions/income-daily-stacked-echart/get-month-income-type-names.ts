import * as _ from 'lodash';
import { CalendarMonth } from 'src/models/calendar-month.model';
import { DayActivityType } from 'src/models/day-activity-type.model';

export function getMonthIncomeTypeNames(
  calendarMonth: CalendarMonth
): string[] {
  const typeNames: string[] = [];
  calendarMonth.calendarDays.forEach((day) => {
    if (day.dayActivityType === DayActivityType.WORKING) {
      day.dayIncomes.forEach((income) => {
        typeNames.push(income.incomeTypeName);
      });
    }
  });
  return _.uniq(typeNames);
}
