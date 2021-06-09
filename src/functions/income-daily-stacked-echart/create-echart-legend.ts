import * as _ from 'lodash';
import { GrouppedDayIncome } from 'src/models/echart-income-stacked/groupped-day-income.model';

export function createEchartLegend(items: GrouppedDayIncome[]) {
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
