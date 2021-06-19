import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { createActivityReport } from 'src/functions/activity-reports/create-activity-report';
import { ActivityPeriod } from 'src/models/activity-report/activity-period.model';
import { ActivityReport } from 'src/models/activity-report/activity-report.model';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import * as activityType from 'src/models/activity-report/activity-types.model';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';
import { CALENDAR_YEAR } from 'src/consts/url-consts';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  calendarYear: CalendarYear;
  yearNumber: number;
  sub: Subscription;
  dataSource: ActivityPeriod[];
  activityType: any = activityType;
  activityReport: ActivityReport;
  displayedColumns = ['dataFrom', 'activityType', 'dataTo', 'daysQuantity'];

  constructor(
    private router: Router,
    private calendarYearService: CalendarYearService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.yearNumber = this.route.snapshot.queryParams['yearNumber'];
    this.sub = this.calendarYearService
      .calendarYearByEmailAndYearNumber$(this.yearNumber)
      .subscribe((calendarYear) => {
        this.calendarYear = calendarYear;
        this.activityReport = createActivityReport(this.calendarYear);
        this.dataSource = this.activityReport.activityPeriods;
        console.log('activity', this.dataSource);
      });
  }

  goToCalendar() {
    this.router.navigate([CALENDAR_YEAR], {
      queryParams: { yearNumber: this.calendarYear.yearNumber },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
