import { ActivityPeriod } from 'src/models/activity-report/activity-period.model';
import { ActivityReport } from 'src/models/activity-report/activity-report.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';

export function sumupActivityDays(
  activityPeriods: ActivityPeriod[]
): ActivityReport {
  let totalWorkingDays = 0;
  let totalDayOffs = 0;
  let totalUndefinedDays = 0;

  activityPeriods.forEach((a) => {
    totalWorkingDays =
      a.activityType === DayActivityType.WORKING
        ? totalWorkingDays + a.daysQuantity
        : totalWorkingDays + 0;

    totalDayOffs =
      a.activityType === DayActivityType.DAY_OFF
        ? totalDayOffs + a.daysQuantity
        : totalDayOffs + 0;

    totalUndefinedDays =
      a.activityType === DayActivityType.NOT_DEFINED
        ? totalUndefinedDays + a.daysQuantity
        : totalUndefinedDays + 0;
  });

  const report: ActivityReport = {
    totalUndefinedDays: totalUndefinedDays,
    totalDayOffs: totalDayOffs,
    totalWorkingDays: totalWorkingDays,
    activityPeriods: activityPeriods,
  };
  return report;
}
