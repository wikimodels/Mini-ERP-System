import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { EchartMonthIncome } from 'src/models/echart-income/echart-month-income.model';
import { createEchartMonthIncome } from './create-echart-month-income';
import { createEchartOption } from './create-echart-option';
import { getAllDayIncomesForMonth } from './get-all-day-incomes-for-month';

export function getEchartOption(calendarYear: CalendarYear) {
  const echartMonthIncomes: EchartMonthIncome[] = [];

  calendarYear.calendarMonths.forEach((month) => {
    const dayIncomes = getAllDayIncomesForMonth(month);
    const monthIncomeObj = createEchartMonthIncome(month, dayIncomes);
    echartMonthIncomes.push(monthIncomeObj);
  });
  const chartOption = createEchartOption(echartMonthIncomes);
  return chartOption;
}
