import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';

export function insertDayIncomeRecords(
  dayNumber: number,
  monthNumber: number,
  calendarYear: CalendarYear,
  data: DayIncome[]
): CalendarYear {
  let monthIndex;
  let dayIndex;

  monthIndex = calendarYear.calendarMonths.findIndex(
    (m) => m.monthNumber == monthNumber
  );

  if (monthIndex > -1) {
    dayIndex = calendarYear.calendarMonths[monthIndex].calendarDays.findIndex(
      (d) =>
        d.dayNumber == dayNumber &&
        d.dayMomentumType === DayMomentumType.CURRENT
    );

    calendarYear.calendarMonths[monthIndex].calendarDays[dayIndex].dayIncomes =
      [...data];
    return calendarYear;
  }
}
