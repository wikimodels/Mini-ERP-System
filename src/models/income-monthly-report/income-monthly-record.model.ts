export interface IncomeMonthlyRecord {
  id: string;
  dayDateStr: string;
  dayCSS: string;
  docNumber?: string;
  incomeSum: number;
  incomeTypeName: string;
  dayDate: Date;
}
