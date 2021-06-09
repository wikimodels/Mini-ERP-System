import { Guid } from 'guid-typescript';
import { DayCSS } from 'src/models/enums/day-css.enum';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

export function createDayIncome(
  docNumber: string,
  incomeSum: number,
  incomeTypeId: string,
  date: string,
  incomeTypes: IncomeType[]
): DayIncome {
  const incomeTypeName = incomeTypes.find((t) => t.id == incomeTypeId).typeName;

  const dayIncomeId = Guid.create().toString();

  const dayIncome: DayIncome = {
    id: dayIncomeId,
    dayDateStr: date,
    dayCSS: DayCSS.DAY_WORKING,
    docNumber: docNumber,
    incomeSum: incomeSum,
    incomeTypeName: incomeTypeName,
  };

  return dayIncome;
}
