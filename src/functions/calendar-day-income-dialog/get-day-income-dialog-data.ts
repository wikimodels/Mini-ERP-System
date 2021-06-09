import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { CalendarIncomeDialogRecord } from 'src/models/income-yearly-report/calendar-income-dialog-record.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

export function getDayIncomeDialogData(
  day: CalendarDay,
  incomeTypes: IncomeType[],
  date: string
): CalendarIncomeDialogRecord {
  const data: CalendarIncomeDialogRecord = {
    title: 'Запись о доходах',
    dayNumber: day.dayNumber,
    monthNumber: day.monthNumber,
    yearNumber: day.yearNumber,
    date: date,
    incomeTypes: incomeTypes,
  };
  return data;
}
