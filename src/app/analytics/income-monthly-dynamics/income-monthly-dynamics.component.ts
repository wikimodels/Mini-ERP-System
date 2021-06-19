import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getEchartOption } from 'src/functions/income-monthly-echart/get-echart-option';
import { getGrouppedYearIncomes } from 'src/functions/income-monthly-stacked-echart/get-groupped-year-incomes';
import { createStackedEchartOptions } from 'src/functions/income-monthly-stacked-echart/create-stacked=echart-options';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';
import { MONTHS_INCOME_REPORT } from 'src/consts/url-consts';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

@Component({
  selector: 'app-income-monthly-dynamics',
  templateUrl: './income-monthly-dynamics.component.html',
  styleUrls: ['./income-monthly-dynamics.component.css'],
})
export class IncomeMonthlyDynamicsComponent implements OnInit, OnDestroy {
  calendarYear: CalendarYear;
  combinedChartOption: any; //EChartOption;
  @Input() stackedChartOption: any; // EChartOption;
  @Input() yearNumber: number;
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

        this.combinedChartOption = getEchartOption(calendarYear);

        const yearIncomes = getGrouppedYearIncomes(this.calendarYear);
        this.stackedChartOption = createStackedEchartOptions(yearIncomes);
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
