import { EchartDayIncome } from 'src/models/echart-income/echart-day-income.model';

export function createEchartBarSeries(dayIncomes: EchartDayIncome[]) {
  const series = {
    name: 'доход',
    type: 'bar',
    yAxisIndex: 1,
    itemStyle: {
      normal: {
        color: '#ff7142',
      },
    },
    data: dayIncomes.reduce((acc, value) => {
      acc.push(value.dayTotalMoney);
      return acc;
    }, []),
  };
  return series;
}
