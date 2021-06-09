import { DayActivityType } from '../enums/day-activity-type.enum';
import { DayCSS } from '../enums/day-css.enum';
import { DayMomentumType } from '../enums/day-momentum-type.enum';
import { DayIncome } from '../income-yearly-report/day-income.model';

export interface CalendarDay {
  dayNameLong: string;
  dayNameShort: string;
  dayNumber: number;
  dayNumberStr: string;
  dayOfWeek: number;
  dayDateStr: string;
  dayActivityType: DayActivityType;
  dayMomentumType: DayMomentumType;
  dayCSS: DayCSS;
  dayIncomes?: DayIncome[];
  monthNumber: number;
  yearNumber: number;
}
