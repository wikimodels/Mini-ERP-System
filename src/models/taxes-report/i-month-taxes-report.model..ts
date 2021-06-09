export interface IMonthTaxesReport {
  longMonthName: string;
  shortMonthName: string;
  monthNumberStr: string;
  monthNumber: number;
  income: number;
  socialTaxRate: number;
  pensionTaxRate: number;
  calculatedSocialTax: number;
  calculatedPensionTax: number;
  calculatedTotalTax: number;
}
