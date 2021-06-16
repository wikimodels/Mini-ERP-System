import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DAY_INCOME_REPORT } from 'src/consts/url-consts';
import { DayCSS } from 'src/models/enums/day-css.enum';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';

import { CalendarDayIncomeReport } from 'src/models/income-yearly-report/calendar-day-income-report.model';
import { CalendarMonthIncomeReport } from 'src/models/income-yearly-report/calendar-month-income-report.model';

@Component({
  selector: 'app-month-income-expansion-panel',
  templateUrl: './month-income-expansion-panel.component.html',
  styleUrls: ['./month-income-expansion-panel.component.css'],
})
export class MonthIncomeExpansionPanelComponent implements OnInit {
  @Input() yearNumber: number;
  @Input() monthNumber: number;
  @Input() month: CalendarMonthIncomeReport;
  momentumType: any = DayMomentumType;
  panelState = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('monthNumber', this.monthNumber);
    if (this.monthNumber == this.month.monthNumber) {
      this.panelState = true;
    }
  }
  goToDayIncomeReport(day: CalendarDayIncomeReport) {
    if (
      day.dayMomentumType &&
      day.dayMomentumType === 'current' &&
      day.dayCSS === DayCSS.DAY_WORKING
    ) {
      this.router.navigate([DAY_INCOME_REPORT], {
        queryParams: {
          yearNumber: this.yearNumber,
          monthNumber: day.monthNumber,
          dayNumber: day.dayNumber,
        },
      });
    }
  }
}
