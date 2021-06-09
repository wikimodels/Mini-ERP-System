import { CalendarYear } from 'src/models/calendar-year.model';
import { CalendarMonthIncomeReport } from 'src/models/income-yearly-report/calendar-month-income-report.model';
import { CalendarYearIncomeReport } from 'src/models/income-yearly-report/calendar-year-income-report.model';

import { createCalendarMonthIncomeReport } from './create-calendar-month-income-report';

export function createCalendarYearIncomeReport(calendarYear: CalendarYear) {
  const monthsIncomeReports: CalendarMonthIncomeReport[] = [];
  calendarYear.calendarMonths.forEach((m) => {
    const report = createCalendarMonthIncomeReport(m);
    monthsIncomeReports.push(report);
  });
  const yearTotal = monthsIncomeReports.reduce((acc, value) => {
    acc = acc + value.monthIncomeTotal;
    return acc;
  }, 0);
  const yearIncomeReport: CalendarYearIncomeReport = {
    yearNumber: calendarYear.yearNumber,
    monthActivityStart: calendarYear.monthActivityStart,
    monthActivityEnd: calendarYear.monthActivityEnd,
    yearIncomeTotal: yearTotal,
    monthsIncomeReports: monthsIncomeReports,
  };
  return yearIncomeReport;
}
