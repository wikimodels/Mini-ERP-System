import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';
import { EchartDayIncome } from 'src/models/echart-income/echart-day-income.model';
import { createEchartOption } from './create-echart-option';
import { groupDayIncomes } from './group-day-incomes';

export function getEchartOption(calendarMonth: CalendarMonth) {
  const dayIncomes: EchartDayIncome[] = groupDayIncomes(calendarMonth);
  const chartOption = createEchartOption(dayIncomes);
  return chartOption;
}
