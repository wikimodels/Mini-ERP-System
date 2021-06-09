import * as _ from 'lodash';
import { GrouppedDayIncomeItem } from 'src/models/echart-income-stacked/groupped-day-income-item.model';
import { GrouppedDayIncome } from 'src/models/echart-income-stacked/groupped-day-income.model';

export function createEchartStackSeries(items: GrouppedDayIncome[]) {
  const grouppedDayItems: GrouppedDayIncomeItem[] = [];
  items.forEach((i) => {
    grouppedDayItems.push(...i.grouppedIncomes);
  });
  const series = _(grouppedDayItems)
    .groupBy((i) => i.incomeTypeName)
    .map((value, key) => {
      return {
        name: key,
        type: 'bar',
        stack: 'доход ',
        emphasis: {
          focus: 'series',
        },
        data: value.reduce((acc, val) => {
          acc.push(val.incomeSum);
          return acc;
        }, []),
      };
    })
    .value();
  return series;
}
