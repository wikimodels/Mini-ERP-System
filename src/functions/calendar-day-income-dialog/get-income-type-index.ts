import { DayIncome } from 'src/models/income-yearly-report/day-income.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

export function getIncomeTypeIndex(
  dayIncome: DayIncome,
  incomeTypes: IncomeType[]
) {
  const incomeTypeIndex = incomeTypes.findIndex(
    (t) => t.typeName == dayIncome.incomeTypeName
  );
  return incomeTypeIndex;
}
