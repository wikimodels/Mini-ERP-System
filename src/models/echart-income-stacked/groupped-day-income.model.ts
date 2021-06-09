import { GrouppedDayIncomeItem } from './groupped-day-income-item.model';

export interface GrouppedDayIncome {
  dayNumberStr: string;
  grouppedIncomes: GrouppedDayIncomeItem[];
}
