import { DayCSS } from '../enums/day-css.enum';
import { DayMomentumType } from '../enums/day-momentum-type.enum';
import { DayIncome } from './day-income.model';

export interface CalendarDayIncomeReport {
  dayCSS: DayCSS;
  dayNumberStr: string;
  dayNameShort: string;
  dayIncomeTotal: number;
  monthNumber: number;
  dayNumber: number;
  DayIncomeRecordDialogs: DayIncome[];
  dayMomentumType: DayMomentumType;
}
