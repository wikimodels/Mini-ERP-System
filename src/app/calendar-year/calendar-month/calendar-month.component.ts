import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';

import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.css'],
})
export class CalendarMonthComponent implements OnInit {
  @Input() month: CalendarMonth;
  @Input() incomeTypes: IncomeType[];
  monthNumber: number;
  panelState = false;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.monthNumber = this.route.snapshot.queryParams['monthNumber'];
    console.log(this.month);
    if (this.monthNumber == this.month.monthNumber) {
      this.panelState = true;
    }
  }
}
