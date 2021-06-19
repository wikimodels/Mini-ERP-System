import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';

export function getAllDayIncomesForMonth(
  calendarMonth: CalendarMonth
): DayIncome[] {
  const monthIncomes: DayIncome[] = [];
  calendarMonth.calendarDays.forEach((day) => {
    if (day.dayActivityType === DayActivityType.WORKING) {
      monthIncomes.push(...day.dayIncomes);
    }
  });
  return monthIncomes;
}
