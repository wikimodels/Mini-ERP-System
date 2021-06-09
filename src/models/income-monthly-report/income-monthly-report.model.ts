import { IncomeMonthlyRecord } from './income-monthly-record.model';

export interface IncomeMonthlyReport {
  yearNumber: number;
  longMonthName: string;
  shortMonthName: string;
  monthNumberStr: string;
  daysInMonth: number;
  monthNumber: number;
  monthTotal: number;
  incomeMonthlyRecords: IncomeMonthlyRecord[];
}
