import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { createCalendarYearIncomeReport } from 'src/functions/income-yearly-reports/create-calendar-year-income-report';

import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

import { CalendarYearIncomeReport } from 'src/models/income-yearly-report/calendar-year-income-report.model';
import { CalendarYearService } from '../services/core/calendar-year.service';
@Component({
  selector: 'app-months-income-report',
  templateUrl: './months-income-report.component.html',
  styleUrls: ['./months-income-report.component.css'],
  providers: [],
})
export class MonthsIncomeReportComponent implements OnInit {
  sub: Subscription;
  yearNumber: number;
  monthNumber: number;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  hide = true;
  yearIncomeReport: CalendarYearIncomeReport;
  constructor(
    private calendarYearService: CalendarYearService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.yearNumber = this.route.snapshot.queryParams['yearNumber'];
    this.monthNumber = this.route.snapshot.queryParams['monthNumber'];
    this.sub = this.calendarYearService
      .calendarYearByEmailAndYearNumber$(this.yearNumber)
      .subscribe((value: CalendarYear) => {
        if (value) {
          this.yearIncomeReport = createCalendarYearIncomeReport(value);
          console.log(this.yearIncomeReport);
        }
      });
  }

  closeAccordion() {
    this.accordion.closeAll();
    this.hide = !this.hide;
  }

  openAccordion() {
    this.accordion.openAll();
    this.hide = !this.hide;
  }
}
