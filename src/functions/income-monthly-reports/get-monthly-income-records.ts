import { CalendarYear } from 'src/models/calendar-year.model';
import { IncomeMonthlyReport } from 'src/models/income-monthly-report/income-monthly-report.model';
import { calculateMonthlyTotal } from './calculate-monthly-total';
import { getDailyIncomeRecords } from './get-daily-income-records';

export function getMonthlyIncomeRecords(calendarYear: CalendarYear) {
  const monthlyIncomeReports: IncomeMonthlyReport[] = [];
  calendarYear.calendarMonths.forEach((m) => {
    const incomedailyRecords = getDailyIncomeRecords(
      m,
      calendarYear.yearNumber
    );
    const monthTotal = calculateMonthlyTotal(incomedailyRecords);
    const incomeMonthlyReport: IncomeMonthlyReport = {
      yearNumber: calendarYear.yearNumber,
      longMonthName: m.longMonthName,
      shortMonthName: m.shortMonthName,
      monthNumberStr: m.monthNumberStr,
      daysInMonth: m.daysInMonth,
      monthNumber: m.monthNumber,
      incomeMonthlyRecords: incomedailyRecords,
      monthTotal: monthTotal,
    };
    monthlyIncomeReports.push(incomeMonthlyReport);
  });
  return monthlyIncomeReports;
}
