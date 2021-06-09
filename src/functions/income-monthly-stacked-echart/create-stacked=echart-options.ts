import { GrouppedDayIncome } from 'src/models/echart-income-stacked/groupped-day-income.model';
import { GrouppedMonthIncome } from 'src/models/echart-income-stacked/groupped-month-income.model';
import { createEchartLegend } from './create-echart-legend';
import { createEchartStackSeries } from './create-echart-stack-series';
import { createEchartAxis } from './create-echart-xAxis';

export function createStackedEchartOptions(items: GrouppedMonthIncome[]) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: createEchartLegend(items),
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [createEchartAxis(items)],
    yAxis: [
      {
        name: 'рубли',
        type: 'value',
      },
    ],
    series: createEchartStackSeries(items),
  };
}
