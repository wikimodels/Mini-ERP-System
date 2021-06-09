import { EchartMonthIncome } from 'src/models/echart-income/echart-month-income.model';

export function createEchartBarSeries(monthIncomes: EchartMonthIncome[]) {
  const series = {
    name: 'доход',
    type: 'bar',
    yAxisIndex: 1,
    itemStyle: {
      normal: {
        color: '#ff7142',
      },
    },
    data: monthIncomes.reduce((acc, value) => {
      acc.push(value.monthTotalMoney);
      return acc;
    }, []),
  };
  return series;
}
