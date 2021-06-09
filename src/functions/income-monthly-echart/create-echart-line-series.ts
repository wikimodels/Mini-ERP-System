import { EchartMonthIncome } from 'src/models/echart-income/echart-month-income.model';

export function createEchartLineSeries(monthIncomes: EchartMonthIncome[]) {
  const series = {
    name: 'операции',
    type: 'line',
    itemStyle: {
      normal: {
        color: '#9a4d92',
      },
    },
    data: monthIncomes.reduce((acc, value) => {
      acc.push(value.monthTotalOperations);
      return acc;
    }, []),
  };
  return series;
}
