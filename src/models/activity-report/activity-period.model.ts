import { DayActivityType } from '../enums/day-activity-type.enum';
import { DayCSS } from '../enums/day-css.enum';

export interface ActivityPeriod {
  dataFrom: string;
  dataTo: string;
  activityType: DayActivityType;
  daysQuantity: number;
  dayCSS: DayCSS;
}
