import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';
import { MONTHS_INCOME_REPORT } from 'src/consts/url-consts';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

@Component({
  selector: 'app-income-daily-dynamics',
  templateUrl: './income-daily-dynamics.component.html',
  styleUrls: ['./income-daily-dynamics.component.css'],
})
export class IncomeDailyDynamicsComponent implements OnInit, OnDestroy {
  calendarYear: CalendarYear;
  yearNumber: number;
  sub: Subscription;

  constructor(
    private calendarYearService: CalendarYearService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.yearNumber = this.route.snapshot.queryParams['yearNumber'];
    this.sub = this.calendarYearService
      .calendarYearByEmailAndYearNumber$(this.yearNumber)
      .subscribe((calendarYear) => {
        this.calendarYear = calendarYear;
      });
  }
  goToMonthIncomeReport(year: CalendarYear) {
    this.router.navigate([MONTHS_INCOME_REPORT], {
      queryParams: { yearNumber: year.yearNumber },
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
