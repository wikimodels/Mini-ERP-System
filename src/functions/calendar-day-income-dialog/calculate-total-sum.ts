import { DayIncome } from 'src/models/income-yearly-report/day-income.model';

export function calculateTotalSum(dayIncomes: DayIncome[]): number {
  const sum = dayIncomes.reduce((acc, val) => {
    acc = acc + val.incomeSum;
    return acc;
  }, 0);
  return sum;
}
