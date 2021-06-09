import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createDayIncome } from 'src/functions/calendar-day-income-dialog/create-day-income';
import { pushDayIncomeRecord } from 'src/functions/calendar-day-income-dialog/push-day-income-record';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';
import { CalendarYearService } from '../core/calendar-year.service';
import { CalendarYearViewService } from './calendar-year-view.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarDayIncomeService {
  constructor(
    private calendarYearService: CalendarYearService,
    private calendarYearViewService: CalendarYearViewService
  ) {}
  addIncomeRecord$(
    dayNumber: number,
    monthNumber: number,
    incomeTypes: IncomeType[],
    date: string,
    docNumber: string,
    incomeSum: number,
    incomeTypeId: string
  ): Observable<CalendarYear> {
    const dayIncome = createDayIncome(
      docNumber,
      incomeSum,
      incomeTypeId,
      date,
      incomeTypes
    );
    let year = this.calendarYearViewService.getCalendarYearData().calendarYear;

    year = pushDayIncomeRecord(dayNumber, monthNumber, dayIncome, year);

    return this.calendarYearService.updateCalendarYear$(year);
  }
}
