import { CalendarMonth } from 'src/models/calendar-month.model';
import { CalendarDayIncomeReport } from 'src/models/income-yearly-report/calendar-day-income-report.model';
import { CalendarMonthIncomeReport } from 'src/models/income-yearly-report/calendar-month-income-report.model';

import { createCalendarDayIncomeReport } from './create-calendar-day-income-report';

export function createCalendarMonthIncomeReport(
  calendarMonth: CalendarMonth
): CalendarMonthIncomeReport {
  const calendarDayIncomeReports = [];
  calendarMonth.calendarDays.forEach((d) => {
    const report = createCalendarDayIncomeReport(d);
    calendarDayIncomeReports.push(report);
  });

  const monthIncomeTotal = calendarDayIncomeReports.reduce(
    (acc, value: CalendarDayIncomeReport) => {
      acc = acc + value.dayIncomeTotal;
      return acc;
    },
    0
  );

  const monthReport: CalendarMonthIncomeReport = {
    daysIncomeRecords: calendarDayIncomeReports,
    monthIncomeTotal: monthIncomeTotal,
    longMonthName: calendarMonth.longMonthName,
    shortMonthName: calendarMonth.shortMonthName,
    monthNumberStr: calendarMonth.monthNumberStr,
    daysInMonth: calendarMonth.daysInMonth,
    monthNumber: calendarMonth.monthNumber,
  };
  return monthReport;
}
