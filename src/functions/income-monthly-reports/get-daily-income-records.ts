import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';
import { IncomeMonthlyRecord } from 'src/models/income-monthly-report/income-monthly-record.model';
import { addLeadingZero } from '../add-leading-zero';

export function getDailyIncomeRecords(
  calendarMonth: CalendarMonth,
  yearNumber: number
) {
  const incomeMonthlyRecords: IncomeMonthlyRecord[] = [];
  calendarMonth.calendarDays.forEach((day) => {
    if (day.dayActivityType === DayActivityType.WORKING) {
      day.dayIncomes.forEach((income) => {
        const record: IncomeMonthlyRecord = {
          id: income.id,
          dayDateStr: day.dayDateStr,
          dayCSS: day.dayCSS,
          docNumber: income.docNumber,
          incomeSum: income.incomeSum,
          incomeTypeName: income.incomeTypeName,
          dayDate: new Date(
            `${yearNumber}-${addLeadingZero(calendarMonth.monthNumber)}-${
              day.dayNumberStr
            }`
          ),
        };
        incomeMonthlyRecords.push(record);
      });
    }
  });
  return incomeMonthlyRecords;
}
