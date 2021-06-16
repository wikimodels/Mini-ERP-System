import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

export function updateAllIncomeTypesInCalendarYears(
  calendarYears: CalendarYear[],
  oldIncomeType: IncomeType,
  newIncomeTypeName: string
) {
  calendarYears.forEach((year) => {
    year.calendarMonths.forEach((month) => {
      month.calendarDays.forEach((d) => {
        if (d.dayActivityType === DayActivityType.WORKING) {
          d.dayIncomes.forEach((dayIncome) => {
            if (dayIncome.incomeTypeName === oldIncomeType.typeName) {
              dayIncome.incomeTypeName = newIncomeTypeName;
            }
          });
        }
      });
    });
  });
  return calendarYears;
}
