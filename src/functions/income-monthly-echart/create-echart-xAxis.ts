import { EchartMonthIncome } from 'src/models/echart-income/echart-month-income.model';

export function createEchartXAxis(monthIncomes: EchartMonthIncome[]) {
  const xAxis = {
    type: 'category',
    axisPointer: {
      type: 'shadow',
    },
    data: monthIncomes.reduce((acc, value) => {
      acc.push(value.shortMonthName);
      return acc;
    }, []),
  };
  return xAxis;
}
