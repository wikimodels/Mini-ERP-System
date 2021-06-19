import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';
import { MONTHS_INCOME_REPORT } from 'src/consts/url-consts';
import { getMonthlyIncomeRecords } from 'src/functions/income-monthly-reports/get-monthly-income-records';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { IncomeMonthlyReport } from 'src/models/income-monthly-report/income-monthly-report.model';
import { MonthData } from 'src/models/income-monthly-report/month-data.model';
import { IncomeService } from '../services/income.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css'],
  providers: [],
})
export class IncomeListComponent implements OnInit, OnDestroy, AfterViewInit {
  calendarYear: CalendarYear;
  incomeMonthlyReports: IncomeMonthlyReport[];
  monthsData: MonthData[];
  yearNumber: number;
  sub: Subscription;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private calendarYearService: CalendarYearService,
    private route: ActivatedRoute,
    private incomeService: IncomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.yearNumber = this.route.snapshot.queryParams['yearNumber'];
    this.sub = this.calendarYearService
      .calendarYearByEmailAndYearNumber$(this.yearNumber)
      .subscribe((calendarYear) => {
        this.calendarYear = calendarYear;
        this.incomeMonthlyReports = getMonthlyIncomeRecords(this.calendarYear);
        this.monthsData = this.incomeService.getMonthsData(
          this.incomeMonthlyReports
        );
      });
  }

  ngAfterViewInit() {}

  goToMonthIncomeReport(year: CalendarYear) {
    this.router.navigate([MONTHS_INCOME_REPORT], {
      queryParams: { yearNumber: year.yearNumber },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
