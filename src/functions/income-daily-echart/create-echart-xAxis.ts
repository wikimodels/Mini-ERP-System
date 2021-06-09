import { EchartDayIncome } from 'src/models/echart-income/echart-day-income.model';

export function createEchartXAxis(dayIncomes: EchartDayIncome[]) {
  const xAxis = {
    type: 'category',
    axisPointer: {
      type: 'shadow',
    },
    data: dayIncomes.reduce((acc, value) => {
      acc.push(value.dayNumberStr);
      return acc;
    }, []),
  };
  return xAxis;
}
