import * as _ from 'lodash';
import { GrouppedMonthIncomeItem } from 'src/models/echart-income-stacked/groupped-month-income-item.model';
import { GrouppedMonthIncome } from 'src/models/echart-income-stacked/groupped-month-income.model';

export function createEchartStackSeries(items: GrouppedMonthIncome[]) {
  const grouppedMonthItems: GrouppedMonthIncomeItem[] = [];
  items.forEach((i) => {
    grouppedMonthItems.push(...i.grouppedIncomes);
  });

  const series = _(grouppedMonthItems)
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
