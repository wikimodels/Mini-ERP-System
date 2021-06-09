import { IncomeType } from './income-type.model';

export interface CalendarIncomeDialogRecord {
  title: string;
  dayNumber: number;
  monthNumber: number;
  yearNumber: number;
  date: string;
  incomeTypes: IncomeType[];
}
