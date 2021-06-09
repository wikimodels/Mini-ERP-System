import { EchartDayIncome } from 'src/models/echart-income/echart-day-income.model';

export function createEchartLineSeries(dayIncomes: EchartDayIncome[]) {
  const series = {
    name: 'операции',
    type: 'line',
    itemStyle: {
      normal: {
        color: '#9a4d92',
      },
    },
    data: dayIncomes.reduce((acc, value) => {
      acc.push(value.dayTotalOperations);
      return acc;
    }, []),
  };
  return series;
}
