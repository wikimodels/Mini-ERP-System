import { CalendarMonth } from 'src/models/calendar-month.model';
import { CalendarYear } from 'src/models/calendar-year.model';
import { GrouppedMonthIncome } from 'src/models/echart-income-stacked/groupped-month-income.model';
import { addMissingIncomeTypeNames } from './add-missing-income-type-names';
import { getYearIncomeTypeNames } from './get-year-income-type-names';
import { groupMonthIncomes } from './group-month-incomes';

export function getGrouppedYearIncomes(
  calendarYear: CalendarYear
): GrouppedMonthIncome[] {
  let grouppedIncomes: GrouppedMonthIncome[] = [];
  calendarYear.calendarMonths.forEach((month) => {
    const grouppedIncome = groupMonthIncomes(month);
    grouppedIncomes.push(grouppedIncome);
  });

  const incomeTypeNames = getYearIncomeTypeNames(calendarYear);

  grouppedIncomes = addMissingIncomeTypeNames(grouppedIncomes, incomeTypeNames);

  return grouppedIncomes;
}
