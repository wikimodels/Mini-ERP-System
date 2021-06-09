import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { YearNumber } from 'src/models/nav-bar/year-numbers.model';
import { CalendarYearService } from '../core/calendar-year.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  moment: any = moment;
  private yearNumbersSub = new BehaviorSubject<YearNumber[]>([]);
  yearNumbersSub$ = this.yearNumbersSub.asObservable();

  getYearNumbers() {
    return this.yearNumbersSub.getValue();
  }

  setYearNumbers(yearNumbers: YearNumber[]) {
    this.yearNumbersSub.next(yearNumbers);
  }

  constructor(private calendarYearService: CalendarYearService) {}

  getCalendarYearNumbers() {
    this.calendarYearService
      .calendarYeasByEmail$()
      .pipe(
        map((value: CalendarYear[]) => {
          const data = value.reduce((acc, current: CalendarYear) => {
            acc.push({ yearId: current.id, yearNumber: current.yearNumber });
            return acc;
          }, []);
          return data;
        })
      )
      .subscribe((value) => {
        this.setYearNumbers(value);
      });
  }

  getInitialYearNumber(yearNumbers: YearNumber[]) {
    const currentYearNumber = moment().year();
    const index = yearNumbers.findIndex(
      (year) => year.yearNumber === currentYearNumber
    );
    if (index > -1) {
      return yearNumbers[index];
    } else {
      return yearNumbers[yearNumbers.length - 1];
    }
  }
}
