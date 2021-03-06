import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { fillInCalendarYear } from 'src/functions/fill-in-calendar-year';
import { copyCalendarYear } from 'src/functions/copy-calendaer-year';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { getCopyToCalendarYear } from 'src/functions/calendar-year-dialog/get-copy-to-calendar-year';
import { CalendarYearService } from '../core/calendar-year.service';
import { AuthService } from '../shared/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalendarYearCrudService {
  constructor(
    private authService: AuthService,
    private calendarYearService: CalendarYearService
  ) {}

  createCalendarYear$(
    monthActivityStart: number,
    monthActivityEnd: number,
    yearNumber: number
  ) {
    const calendarYear = fillInCalendarYear(
      this.authService.getUserEmail(),
      monthActivityStart,
      monthActivityEnd,
      yearNumber
    );
    calendarYear.id = Guid.create().toString();
    calendarYear.email = this.authService.getUserEmail();
    return this.calendarYearService
      .insertCalendarYear$(calendarYear)
      .pipe(switchMap(() => this.calendarYearService.calendarYeasByEmail$()));
  }

  updateCalendarYear$(
    monthActivityStart: number,
    monthActivityEnd: number,
    copyFromCalendarYear: CalendarYear
  ) {
    const copyToCalendarYear: CalendarYear = getCopyToCalendarYear(
      monthActivityStart,
      monthActivityEnd,
      copyFromCalendarYear.yearNumber,
      this.authService.getUserEmail()
    );
    const calendarYear = copyCalendarYear(
      copyFromCalendarYear,
      copyToCalendarYear
    );

    return this.calendarYearService
      .updateCalendarYear$(calendarYear)
      .pipe(switchMap(() => this.calendarYearService.calendarYeasByEmail$()));
  }

  deleteCalendarYear$(calendarYear: CalendarYear) {
    return this.calendarYearService
      .deleteCalendarYear$(calendarYear)
      .pipe(switchMap(() => this.calendarYearService.calendarYeasByEmail$()));
  }
}
