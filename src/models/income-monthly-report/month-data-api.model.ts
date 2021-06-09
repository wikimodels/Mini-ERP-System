import { IncomeMonthlyRecord } from './income-monthly-record.model';

export interface MonthDataApi {
  incomeMonthlyRecords: IncomeMonthlyRecord[];
  recordsCount: number;
}
