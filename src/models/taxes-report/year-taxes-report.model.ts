import { getTaxValue } from 'src/functions/taxes-reports/get-tax-value';
import { CalendarMonth } from '../calendar-year/calendar-month.model';
import { CalendarYear } from '../calendar-year/calendar-year.model';

import { IMonthTaxesReport } from './i-month-taxes-report.model.';
import { IYearTaxesReport } from './i-year-taxes-report.model';

export class YearTaxesReport {
  constructor(public calendarYear: CalendarYear) {}

  get report(): IYearTaxesReport {
    const yearTaxes: IYearTaxesReport = {
      yearNumber: this.calendarYear.yearNumber,
      yearPensionTax: this.totalYearValues.totalYearPensionTax,
      yearSocialTax: this.totalYearValues.totalYearSocialTax,
      yearTotalIncome: this.totalYearValues.totalYearIncome,
      monthsTaxes: this.monthsTaxesReports,
      yearTotalTaxes:
        this.totalYearValues.totalYearPensionTax +
        this.totalYearValues.totalYearSocialTax,
    };
    return yearTaxes;
  }

  private get monthsTaxesReports(): IMonthTaxesReport[] {
    const reports: IMonthTaxesReport[] = [];
    this.calendarYear.calendarMonths.forEach((month) => {
      const report = this.getMonthTaxReport(month);
      reports.push(report);
    });
    return reports;
  }

  private get totalYearValues(): {
    totalYearIncome: number;
    totalYearPensionTax: number;
    totalYearSocialTax: number;
  } {
    let totalYearIncome = 0;
    let totalYearPensionTax = 0;
    let totalYearSocialTax = 0;

    this.monthsTaxesReports.forEach((t) => {
      totalYearIncome += t.income;
      totalYearPensionTax += t.calculatedPensionTax;
      totalYearSocialTax += t.calculatedSocialTax;
    });
    return { totalYearIncome, totalYearPensionTax, totalYearSocialTax };
  }

  private getMonthTaxReport(month: CalendarMonth): IMonthTaxesReport {
    const obj: IMonthTaxesReport = {
      longMonthName: month.longMonthName,
      shortMonthName: month.shortMonthName,
      monthNumberStr: month.monthNumberStr,
      monthNumber: month.monthNumber,
      income: month.monthSettings.income,
      socialTaxRate: month.monthSettings.socialTaxRate,
      pensionTaxRate: month.monthSettings.pensionTaxRate,
      calculatedSocialTax: getTaxValue(
        month.monthSettings.income,
        month.monthSettings.socialTaxRate
      ),
      calculatedPensionTax: getTaxValue(
        month.monthSettings.income,
        month.monthSettings.pensionTaxRate
      ),
      calculatedTotalTax: getTaxValue(
        month.monthSettings.income,
        month.monthSettings.socialTaxRate + month.monthSettings.pensionTaxRate
      ),
    };
    return obj;
  }
}
