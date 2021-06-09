import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';

export function getDayIncomeRecords(
  dayNumber: number,
  monthNumber: number,
  calendarYear: CalendarYear
): DayIncome[] {
  const month = calendarYear.calendarMonths.find(
    (m) => m.monthNumber == monthNumber
  );
  console.log('month', month);
  const day = month.calendarDays.find(
    (d) =>
      d.dayNumber == dayNumber && d.dayMomentumType === DayMomentumType.CURRENT
  );
  console.log('day', day);
  return day.dayIncomes;
}
