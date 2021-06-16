import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';

export function replaceDayIncomeRecords(
  dayNumber: number,
  monthNumber: number,
  dayIncome: DayIncome,
  calendarYear: CalendarYear
) {
  let monthIndex;
  let dayIndex;
  let dayIncomeIndex;

  monthIndex = calendarYear.calendarMonths.findIndex(
    (m) => m.monthNumber == monthNumber
  );

  if (monthIndex > -1) {
    console.log('monthIndex', monthIndex);
    dayIndex = calendarYear.calendarMonths[monthIndex].calendarDays.findIndex(
      (d) =>
        d.dayNumber == dayNumber &&
        d.dayMomentumType === DayMomentumType.CURRENT
    );

    if (dayIndex > -1) {
      console.log('dayIndex', dayIndex);
      console.log('dayIncome', dayIncome);
      console.log(
        'dayIncomes',
        calendarYear.calendarMonths[monthIndex].calendarDays[dayIndex]
          .dayIncomes
      );
      dayIncomeIndex = calendarYear.calendarMonths[monthIndex].calendarDays[
        dayIndex
      ].dayIncomes.findIndex((d) => d.id === dayIncome.id);
    }

    console.log('dayIncomeIndex', dayIncomeIndex);
    if (dayIncomeIndex > -1) {
      console.log('dayIncomeIndex', dayIncomeIndex);

      calendarYear.calendarMonths[monthIndex].calendarDays[dayIndex].dayIncomes[
        dayIncomeIndex
      ] = dayIncome;
    }
  }

  console.log('Edited CY', calendarYear);
  return calendarYear;
}
