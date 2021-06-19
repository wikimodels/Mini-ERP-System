import { ActivityPeriod } from 'src/models/activity-report/activity-period.model';
import { ActivityReport } from 'src/models/activity-report/activity-report.model';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

import { cleanupCalendarDays } from './cleanup-calendar-days';
import { createActivityPeriods } from './create-activity-periods';
import { fillInActivityArrays } from './fill-in-activity-arrays';
import { sumupActivityDays } from './sumup-activity-days';

export function createActivityReport(
  calendarYear: CalendarYear
): ActivityReport {
  let calendarDays = cleanupCalendarDays(calendarYear);
  let array = fillInActivityArrays(calendarDays);
  let periods: ActivityPeriod[] = createActivityPeriods(array);
  let report: ActivityReport = sumupActivityDays(periods);
  return report;
}
