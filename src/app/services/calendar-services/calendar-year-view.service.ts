import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_INCOME_TYPES_BY_EMAIL } from 'ignored/urls.const';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { setCalendarDay } from 'src/functions/calendar-year-view/set-calendar-day';
import { CalendarYearData } from 'src/models/calendar-year-data.model';
import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';
import { CalendarYearService } from '../core/calendar-year.service';
import { IncomeTypeService } from '../core/income-type.service';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarYearViewService {
  private calendarYearDataSub = new BehaviorSubject(undefined);

  calendarYearDataSub$ = this.calendarYearDataSub.asObservable();

  getCalendarYearData(): CalendarYearData {
    return this.calendarYearDataSub.getValue();
  }

  setCalendarYearData(calendarYearData: CalendarYearData) {
    this.calendarYearDataSub.next(calendarYearData);
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private calendarYearService: CalendarYearService
  ) {}

  fetchCalendarYearDataByYearId(yearId: string) {
    const calendarYear$: Observable<CalendarYear> = this.calendarYearService
      .calendarYearById$(yearId)
      .pipe(startWith(undefined));

    const incomeTypes$: Observable<IncomeType[]> =
      this.incomeTypesByEmail$().pipe(startWith([]));

    combineLatest(
      calendarYear$,
      incomeTypes$,
      (year: CalendarYear, incomeTypes: IncomeType[]) => {
        const result: CalendarYearData = {
          calendarYear: year,
          incomeTypes: incomeTypes,
        };
        return result;
      }
    )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe((value: CalendarYearData) => {
        console.log(value);
        this.setCalendarYearData(value);
      });
  }

  calendarYearDataByYearId$(yearId: string) {
    const calendarYear$: Observable<CalendarYear> = this.calendarYearService
      .calendarYearById$(yearId)
      .pipe(startWith(undefined));

    const incomeTypes$: Observable<IncomeType[]> =
      this.incomeTypesByEmail$().pipe(startWith([]));

    return combineLatest(
      calendarYear$,
      incomeTypes$,
      (year: CalendarYear, incomeTypes: IncomeType[]) => {
        const result: CalendarYearData = {
          calendarYear: year,
          incomeTypes: incomeTypes,
        };
        return result;
      }
    ).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  fetchCalendarYearDataByYearNumber(yearNumber: number) {
    const calendarYear$: Observable<CalendarYear> = this.calendarYearService
      .calendarYearByEmailAndYearNumber$(yearNumber)
      .pipe(startWith(undefined));

    const incomeTypes$: Observable<IncomeType[]> =
      this.incomeTypesByEmail$().pipe(startWith([]));

    combineLatest(
      calendarYear$,
      incomeTypes$,
      (year: CalendarYear, incomeTypes: IncomeType[]) => {
        const result: CalendarYearData = {
          calendarYear: year,
          incomeTypes: incomeTypes,
        };
        return result;
      }
    )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe((value: CalendarYearData) => {
        console.log(value);
        this.setCalendarYearData(value);
      });
  }

  updateCalendarDay(calendarDay: CalendarDay) {
    let year: CalendarYear = this.getCalendarYearData().calendarYear;

    year = setCalendarDay(
      calendarDay.dayNumber,
      calendarDay.monthNumber,
      year,
      calendarDay
    );

    this.calendarYearService.updateCalendarYear$(year).subscribe((value) => {});
  }

  updateCalendarYearData() {
    const yearId = this.getCalendarYearData().calendarYear.id;
    this.fetchCalendarYearDataByYearId(yearId);
  }

  private incomeTypesByEmail$() {
    const email = this.authService.getUserEmail();
    return this.http.get<IncomeType[]>(GET_INCOME_TYPES_BY_EMAIL(email)).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
