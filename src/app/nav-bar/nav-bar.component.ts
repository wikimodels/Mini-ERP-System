import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ANALYTICS,
  CALENDAR_YEAR,
  CALENDAR_YEARS_ARCHIVE,
  CALENDAR_YEARS_TAXES_PARAMS,
  INCOME_TYPES,
  MONTHS_INCOME_REPORT,
  NO_CALENDAR_YEAR,
} from 'src/consts/url-consts';
import { YearNumber } from 'src/models/nav-bar/year-numbers.model';
import { CalendarYearViewService } from '../services/calendar-services/calendar-year-view.service';
import { NavBarService } from '../services/calendar-services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  yearNumbers: YearNumber[] = [];
  sub: Subscription;
  constructor(
    private router: Router,
    private navBarService: NavBarService,
    private calendarYearViewService: CalendarYearViewService
  ) {}

  ngOnInit(): void {
    this.sub = this.navBarService.yearNumbersSub$.subscribe((value) => {
      if (value.length === 0) {
        this.router.navigate([NO_CALENDAR_YEAR]);
      } else {
        this.yearNumbers = [...value];
        const yearNumber = this.navBarService.getInitialYearNumber(
          this.yearNumbers
        );
        this.goToCalendarView(yearNumber.yearId);
      }
    });
  }

  goToCalendarYearsAchive() {
    this.router.navigate([CALENDAR_YEARS_ARCHIVE]);
  }

  goToIncomeTypes() {
    this.router.navigate([INCOME_TYPES]);
  }
  goToIncomeJournal() {
    //this.router.navigate([YEARS_INCOME_REPORT]);
  }

  goToCalendar() {
    //this.router.navigate([CALENDAR_YEAR]);
  }

  goToCalendarView(yearId: string) {
    this.calendarYearViewService.fetchCalendarYearDataByYearId(yearId);
    this.router.navigate([CALENDAR_YEAR], {
      queryParams: { yearId: yearId },
    });
  }

  goToAnalytics() {
    this.router.navigate([ANALYTICS]);
  }

  goHome() {
    //this.router.navigate([CALENDAR_YEAR]);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
