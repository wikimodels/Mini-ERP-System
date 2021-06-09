import { GrouppedMonthIncomeItem } from 'src/models/echart-income-stacked/groupped-month-income-item.model';
import { GrouppedMonthIncome } from 'src/models/echart-income-stacked/groupped-month-income.model';

export function addMissingIncomeTypeNames(
  grouppedIncomes: GrouppedMonthIncome[],
  typeNames: string[]
) {
  typeNames.forEach((typeName) => {
    grouppedIncomes.forEach((income) => {
      const exists = income.grouppedIncomes.some(
        (item) => item.incomeTypeName === typeName
      );
      if (!exists) {
        const obj: GrouppedMonthIncomeItem = {
          shortMonthName: income.shortMonthName,
          incomeTypeName: typeName,
          incomeSum: 0,
        };
        income.grouppedIncomes.push(obj);
      }
    });
  });
  return grouppedIncomes;
}
