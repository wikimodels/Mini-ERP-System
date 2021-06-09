import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { fillInCalendarYear } from 'src/functions/fill-in-calendar-year';
import { copyCalendarYear } from 'src/functions/copy-calendaer-year';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { getCopyToCalendarYear } from 'src/functions/calendar-year-dialog/get-copy-to-calendar-year';
import { CalendarYearService } from '../core/calendar-year.service';
import { AuthService } from '../shared/auth.service';

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
    return this.calendarYearService.insertCalendarYear$(calendarYear);
  }

  updateWorkingYear$(
    monthActivityStart: number,
    monthActivityEnd: number,
    workingYear: CalendarYear
  ) {
    const copyTo: CalendarYear = getCopyToCalendarYear(
      monthActivityStart,
      monthActivityEnd,
      workingYear.yearNumber
    );
    const calendarYear = copyCalendarYear(workingYear, copyTo);
    return this.calendarYearService.updateCalendarYear$(calendarYear);
  }

  deleteWorkingYear$(year: CalendarYear) {
    return this.calendarYearService.deleteCalendarYear$(year);
  }
}
