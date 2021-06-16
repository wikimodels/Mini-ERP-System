import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import {
  CHECK_EXISTENCE_OF_INCOME_TYPE_IN_CALENDAR_YEARS,
  DELETE_INCOME_TYPE_BY_ID,
  GET_CALENDAR_YEARS_BY_EMAIL,
  GET_INCOME_TYPES_BY_EMAIL,
  INSERT_INCOME_TYPE,
  UPDATE_INCOME_TYPE,
} from 'ignored/urls.const';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { updateAllIncomeTypesInCalendarYears } from 'src/functions/income-types/update-all-income-types-in-calendar-years';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

import { IncomeType } from 'src/models/income-yearly-report/income-type.model';
import { CalendarYearViewService } from '../calendar-services/calendar-year-view.service';
import { AuthService } from '../shared/auth.service';
import { LoadingService } from '../shared/loading.service';
import { CalendarYearService } from './calendar-year.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeTypeService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private loadingService: LoadingService,
    private calendarYearService: CalendarYearService,
    private calendarYearViewService: CalendarYearViewService
  ) {}

  incomeTypesByEmail$() {
    const email = this.authService.getUserEmail();
    return this.http.get<IncomeType[]>(GET_INCOME_TYPES_BY_EMAIL(email)).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  setInitialIncomeType(incomeType: IncomeType) {
    this.incomeTypesByEmail$()
      .pipe(
        switchMap((value: IncomeType[]) => {
          if (value && value.length > 0) {
            return of('Income Types already exist');
          } else {
            return this.addIncomeTypeRecord$(incomeType);
          }
        })
      )
      .subscribe((value) => {
        console.log(value);
      });
  }

  addIncomeTypeRecord$(incomeType: IncomeType) {
    incomeType.id = Guid.create().toString();
    incomeType.email = this.authService.getUserEmail();
    incomeType.typeName = incomeType.typeName.toLocaleLowerCase();

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http
      .post<IncomeType>(INSERT_INCOME_TYPE(), incomeType, { headers: headers })
      .pipe(
        switchMap(() => this.incomeTypesByEmail$()),
        delay(400),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  editIncomeTypeRecord$(incomeType: IncomeType, newIncomeTypeName: string) {
    const newIncomeType: IncomeType = {
      id: incomeType.id,
      email: incomeType.email,
      typeName: newIncomeTypeName.toLocaleLowerCase(),
    };
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http
      .post<IncomeType>(UPDATE_INCOME_TYPE(), newIncomeType, {
        headers: headers,
      })
      .pipe(
        switchMap(() => this.calendarYearService.calendarYeasByEmail$()),
        map((calendarYears: CalendarYear[]) => {
          const myCalendarYears = updateAllIncomeTypesInCalendarYears(
            calendarYears,
            incomeType,
            newIncomeTypeName
          );
          return myCalendarYears;
        }),
        switchMap((calendarYears: CalendarYear[]) =>
          this.calendarYearService.insertManyCalendarYears$(calendarYears)
        ),
        switchMap(() =>
          this.calendarYearViewService.calendarYearDataByYearId$(
            this.calendarYearViewService.getCalendarYearData().calendarYear.id
          )
        ),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  deleteIncomeType$(incomeType: IncomeType) {
    return this.checkExistenceOfIncomeTypeInCalendarYears$(
      incomeType.typeName
    ).pipe(
      switchMap((exists: boolean) => {
        if (exists) {
          return of(`Record ${incomeType.typeName} exists`);
        } else {
          return this.deleteIncomeTypeInDb$(incomeType);
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  checkIncomeTypeInDb$(typeName: string): Observable<boolean> {
    return this.incomeTypesByEmail$().pipe(
      map((result: IncomeType[]) => {
        const index = result.findIndex(
          (incomeType) => incomeType.typeName === typeName
        );
        const exists = index < 0 ? false : true;
        return exists;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private checkExistenceOfIncomeTypeInCalendarYears$(
    incomeTypeName: string
  ): Observable<boolean> {
    return this.http
      .get<boolean>(
        CHECK_EXISTENCE_OF_INCOME_TYPE_IN_CALENDAR_YEARS(
          encodeURIComponent(incomeTypeName),
          this.authService.getUserEmail()
        )
      )
      .pipe(
        tap((res) => {
          this.loadingService.loadingOn();
        }),
        tap((res) => {
          console.log('exists', res);
          this.loadingService.loadingOff();
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  private deleteIncomeTypeInDb$(incomeType: IncomeType) {
    return this.http.delete(DELETE_INCOME_TYPE_BY_ID(incomeType.id)).pipe(
      switchMap(() => this.incomeTypesByEmail$()),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
