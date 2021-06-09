import { GrouppedMonthIncomeItem } from './groupped-month-income-item.model';

export interface GrouppedMonthIncome {
  monthNumberStr: string;
  shortMonthName: string;
  grouppedIncomes: GrouppedMonthIncomeItem[];
}
