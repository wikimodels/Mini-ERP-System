import { GrouppedMonthIncome } from 'src/models/echart-income-stacked/groupped-month-income.model';

export function createEchartAxis(items: GrouppedMonthIncome[]) {
  return {
    name: 'дни',
    type: 'category',
    data: items.reduce((acc, val) => {
      acc.push(val.shortMonthName);
      return acc;
    }, []),
  };
}
