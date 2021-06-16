import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  DELETE_CALENDAR_YEAR_BY_ID,
  GET_CALENDAR_YEARS_BY_EMAIL,
  GET_CALENDAR_YEAR_BY_EMAIL_AND_YEAR,
  GET_CALENDAR_YEAR_BY_ID,
  INSERT_CALENDAR_YEAR,
  INSERT_MANY_CALENDAR_YEARS,
  UPDATE_CALENDAR_YEAR,
} from 'ignored/urls.const';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { compareMonths } from 'src/functions/validators/compare-month';
import { YearAsyncValidator } from 'src/functions/validators/year-async-validator';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarYearService {
  constructor(private authService: AuthService, private http: HttpClient) {}
  headers = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8'
  );

  calendarYeasByEmail$() {
    const email = this.authService.getUserEmail();
    return this.http
      .get<CalendarYear[]>(GET_CALENDAR_YEARS_BY_EMAIL(email))
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  calendarYearById$(id: string) {
    return this.http.get<CalendarYear>(GET_CALENDAR_YEAR_BY_ID(id)).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  calendarYearByEmailAndYearNumber$(yearNumber: number) {
    const email = this.authService.getUserEmail();
    return this.http
      .get<CalendarYear>(GET_CALENDAR_YEAR_BY_EMAIL_AND_YEAR(email, yearNumber))
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  insertCalendarYear$(calendarYear: CalendarYear) {
    return this.http
      .post<CalendarYear>(INSERT_CALENDAR_YEAR(), calendarYear, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  insertManyCalendarYears$(calendarYears: CalendarYear[]) {
    return this.http
      .post<CalendarYear>(INSERT_MANY_CALENDAR_YEARS(), calendarYears, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  updateCalendarYear$(calendarYear: CalendarYear) {
    return this.http
      .post<CalendarYear>(UPDATE_CALENDAR_YEAR(), calendarYear, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  deleteCalendarYear$(calendarYear: CalendarYear) {
    const email = this.authService.getUserEmail();
    return this.http
      .delete(DELETE_CALENDAR_YEAR_BY_ID(calendarYear.id, email))
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  checkYearNumberInDb(yearNumber: number): Observable<boolean> {
    return this.http
      .get<CalendarYear[]>(
        GET_CALENDAR_YEARS_BY_EMAIL(this.authService.getUserEmail())
      )
      .pipe(
        map((result: CalendarYear[]) => {
          let exists = result.some((year) => year.yearNumber === yearNumber);
          return exists;
        })
      );
  }
}
