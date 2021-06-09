import { GrouppedDayIncomeItem } from 'src/models/echart-income-stacked/groupped-day-income-item.model';
import { GrouppedDayIncome } from 'src/models/echart-income-stacked/groupped-day-income.model';

export function addMissingIncomeTypeNames(
  grouppedIncomes: GrouppedDayIncome[],
  typeNames: string[]
) {
  typeNames.forEach((typeName) => {
    grouppedIncomes.forEach((income) => {
      const exists = income.grouppedIncomes.some(
        (item) => item.incomeTypeName === typeName
      );
      if (!exists) {
        const obj: GrouppedDayIncomeItem = {
          dayNumberStr: income.dayNumberStr,
          incomeTypeName: typeName,
          incomeSum: 0,
        };
        income.grouppedIncomes.push(obj);
      }
    });
  });
  return grouppedIncomes;
}
