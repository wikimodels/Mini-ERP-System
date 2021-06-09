import { EchartDayIncome } from 'src/models/echart-income/echart-day-income.model';
import { EchartMonthIncome } from 'src/models/echart-income/echart-month-income.model';
import { createEchartBarSeries } from './create-echart-bar-series';
import { createEchartLineSeries } from './create-echart-line-series';
import { createEchartXAxis } from './create-echart-xAxis';

export function createEchartOption(monthIncomes: EchartMonthIncome[]) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        magicType: {
          title: '',
          show: true,
          type: ['line', 'bar'],
        },
        restore: {
          title: ' ',
          show: true,
        },
      },
    },
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true,
    },
    legend: {
      data: ['операции', 'доход'],
    },
    xAxis: [createEchartXAxis(monthIncomes)],
    yAxis: [
      {
        type: 'value',
        name: 'операции',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        name: 'рубли',
        offset: 0,
        axisLabel: {
          formatter: '{value} ',
        },
      },
    ],
    series: [
      createEchartLineSeries(monthIncomes),
      createEchartBarSeries(monthIncomes),
    ],
  };
}
