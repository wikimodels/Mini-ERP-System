import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CalendarYearData } from 'src/models/calendar-year-data.model';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';
import { CalendarYearViewService } from '../services/calendar-services/calendar-year-view.service';

@Component({
  selector: 'app-calendar-year',
  templateUrl: './calendar-year.component.html',
  styleUrls: ['./calendar-year.component.css'],
  providers: [],
})
export class CalendarYearComponent implements OnInit, OnDestroy, AfterViewInit {
  sub: Subscription;
  incomeTypes: IncomeType[];
  calendarYear: CalendarYear;

  constructor(
    private CalendarYearViewService: CalendarYearViewService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.CalendarYearViewService.calendarYearDataSub$.subscribe(
      (value: CalendarYearData) => {
        if (value && value.calendarYear && value.incomeTypes.length > 0) {
          this.calendarYear = value.calendarYear;
          this.incomeTypes = value.incomeTypes;
          console.log('CY value', value);
        }
      }
    );
  }

  ngAfterViewInit() {}

  goToIncomeJournal(workingYear) {
    // this.router.navigate([MONTHLY_INCOME_GRID_REPORT], {
    //   queryParams: { yearNumber: workingYear.yearNumber },
    // });
  }

  goToSettings(workingYear) {
    // this.router.navigate([WORKING_YEAR_SETTINGS], {
    //   queryParams: {
    //     yearId: workingYear.id,
    //   },
    // });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
