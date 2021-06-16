import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UPDATE_CALENDAR_YEAR } from 'ignored/urls.const';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { setCalenarYearsTaxesParams } from 'src/functions/calendar-years-taxes-params/set-calendar-years-taxes-params';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { MonthSettings } from 'src/models/month-settings.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarYearTaxesParamsService {
  constructor(private http: HttpClient) {}

  updateYearSettings(months: MonthSettings, calendarYear: CalendarYear) {
    calendarYear = setCalenarYearsTaxesParams(months, calendarYear);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http
      .post(UPDATE_CALENDAR_YEAR(), calendarYear, { headers: headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
