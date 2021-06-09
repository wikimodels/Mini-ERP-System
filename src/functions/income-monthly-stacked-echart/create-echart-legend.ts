import * as _ from 'lodash';
import { GrouppedMonthIncome } from 'src/models/echart-income-stacked/groupped-month-income.model';

export function createEchartLegend(items: GrouppedMonthIncome[]) {
  const array = [];
  items.forEach((item) => {
    item.grouppedIncomes.forEach((obj) => {
      array.push(obj.incomeTypeName);
    });
  });
  return {
    data: _.uniq(array),
  };
}
