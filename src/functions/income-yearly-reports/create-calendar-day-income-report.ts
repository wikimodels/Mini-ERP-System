import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { DayCSS } from 'src/models/enums/day-css.enum';
import { CalendarDayIncomeReport } from 'src/models/income-yearly-report/calendar-day-income-report.model';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';

export function createCalendarDayIncomeReport(
  calendarDay: CalendarDay
): CalendarDayIncomeReport {
  const dayCss = calendarDay.dayIncomes ? calendarDay.dayCSS : DayCSS.NO_CSS;
  const dayIncomeTotal = calendarDay.dayIncomes
    ? calculateDayIncome(calendarDay)
    : 0;
  const DayIncomeRecordDialogs = calendarDay.dayIncomes
    ? calendarDay.dayIncomes
    : [];

  const report: CalendarDayIncomeReport = {
    dayNameShort: calendarDay.dayNameShort,
    dayNumberStr: calendarDay.dayNumberStr,
    DayIncomeRecordDialogs: DayIncomeRecordDialogs,
    dayIncomeTotal: dayIncomeTotal,
    monthNumber: calendarDay.monthNumber,
    dayNumber: calendarDay.dayNumber,
    dayMomentumType: calendarDay.dayMomentumType,
    dayCSS: dayCss,
  };
  return report;
}

export function calculateDayIncome(calendarDay: CalendarDay) {
  const incomeTotal = calendarDay.dayIncomes.reduce((acc, value: DayIncome) => {
    let dayIncome = value.incomeSum;
    acc = acc + dayIncome;
    return acc;
  }, 0);
  return incomeTotal;
}
