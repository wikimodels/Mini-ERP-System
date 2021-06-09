import { IncomeMonthlyRecord } from 'src/models/income-monthly-report/income-monthly-record.model';

export function calculateMonthlyTotal(
  incomeDailyRecord: IncomeMonthlyRecord[]
) {
  const total = incomeDailyRecord.reduce((acc, val) => {
    acc = acc + val.incomeSum;
    return acc;
  }, 0);
  return total;
}
