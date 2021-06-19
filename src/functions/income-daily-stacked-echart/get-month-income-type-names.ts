import * as _ from 'lodash';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';

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
