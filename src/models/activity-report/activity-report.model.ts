import { ActivityPeriod } from './activity-period.model';

export interface ActivityReport {
  totalWorkingDays: number;
  totalDayOffs: number;
  totalUndefinedDays: number;
  activityPeriods: ActivityPeriod[];
}
