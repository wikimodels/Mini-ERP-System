import { ActivityPeriod } from 'src/models/activity-report/activity-period.model';
import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';

import { addLeadingZero } from '../add-leading-zero';

export function createActivityPeriods(superArray: CalendarDay[][]) {
  let myArray: ActivityPeriod[] = [];
  for (let i = 0; i < superArray.length; i++) {
    let myLastIndex = superArray[i].length - 1;
    let period: ActivityPeriod = {
      dataFrom: `${superArray[i][0].dayNumberStr}/${addLeadingZero(
        superArray[i][0].monthNumber
      )}/${superArray[i][0].yearNumber}`,
      dataTo: `${superArray[i][myLastIndex].dayNumberStr}/${addLeadingZero(
        superArray[i][myLastIndex].monthNumber
      )}/${superArray[i][myLastIndex].yearNumber}`,
      daysQuantity: superArray[i].length,
      dayCSS: superArray[i][myLastIndex].dayCSS,
      activityType: superArray[i][myLastIndex].dayActivityType,
    };
    myArray.push(period);
  }
  return myArray;
}
