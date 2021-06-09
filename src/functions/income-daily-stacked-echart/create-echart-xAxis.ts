import { GrouppedDayIncome } from 'src/models/echart-income-stacked/groupped-day-income.model';

export function createEchartAxis(items: GrouppedDayIncome[]) {
  return {
    name: 'дни',
    type: 'category',
    data: items.reduce((acc, val) => {
      acc.push(val.dayNumberStr);
      return acc;
    }, []),
  };
}
