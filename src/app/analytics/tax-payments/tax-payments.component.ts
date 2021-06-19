import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';
import { CALENDAR_YEARS_TAXES_PARAMS } from 'src/consts/url-consts';
import { calculateYearTaxes } from 'src/functions/taxes-reports/calculate-year-taxes';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { IMonthTaxesReport } from 'src/models/taxes-report/i-month-taxes-report.model.';
import { IYearTaxesReport } from 'src/models/taxes-report/i-year-taxes-report.model';

@Component({
  selector: 'app-tax-payments',
  templateUrl: './tax-payments.component.html',
  styleUrls: ['./tax-payments.component.css'],
})
export class TaxPaymentsComponent implements OnInit, OnDestroy {
  calendarYear: CalendarYear;
  yearNumber: number;
  sub: Subscription;
  yearTaxesReport: IYearTaxesReport;
  dataSource: IMonthTaxesReport[];
  displayedColumns = ['month', 'income', 'pensionTax', 'socialTax', 'totalTax'];

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
        this.yearTaxesReport = calculateYearTaxes(this.calendarYear);
        this.dataSource = this.yearTaxesReport.monthsTaxes;
        console.log(this.yearTaxesReport);
        console.log(this.dataSource);
      });
  }

  goToSettings() {
    this.router.navigate([CALENDAR_YEARS_TAXES_PARAMS], {
      queryParams: {
        yearId: this.calendarYear.id,
      },
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
