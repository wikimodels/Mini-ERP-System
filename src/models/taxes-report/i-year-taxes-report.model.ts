import { IMonthTaxesReport } from './i-month-taxes-report.model.';

export interface IYearTaxesReport {
  yearNumber: number;
  yearSocialTax: number;
  yearPensionTax: number;
  yearTotalTaxes: number;
  yearTotalIncome: number;
  monthsTaxes: IMonthTaxesReport[];
}
