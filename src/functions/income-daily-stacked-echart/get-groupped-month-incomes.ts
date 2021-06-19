import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';
import { addMissingIncomeTypeNames } from './add-missing-income-type-names';
import { getMonthIncomeTypeNames } from './get-month-income-type-names';
import { groupDayIncomes } from './group-day-incomes';

export function getGrouppedMonthIncomes(calendarMonth: CalendarMonth) {
  let incomes = groupDayIncomes(calendarMonth);
  const incomeTypeNames = getMonthIncomeTypeNames(calendarMonth);
  incomes = addMissingIncomeTypeNames(incomes, incomeTypeNames);

  return incomes;
}
