import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import * as defaults from '../../assets/utils/defaults.json';

import { TimeService } from '../services/shared/time.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DayIncomeDialogComponent } from './day-income-dialog/day-income-dialog.component';

import { delay } from 'rxjs/operators';
import { LoadingService } from '../services/shared/loading.service';
import { BasicSnackbarService } from '../basic-snackbar/basic-snackbar.service';
import { MessageType } from '../basic-snackbar/models/message-type';
import { UrlService } from '../services/shared/url.service';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

import { CalendarYearService } from '../services/core/calendar-year.service';
import { CalendarYearData } from 'src/models/calendar-year-data.model';
import { CalendarYearViewService } from '../services/calendar-services/calendar-year-view.service';
import { getDayIncomeRecords } from 'src/functions/calendar-day-income-dialog/get-day-income-records';
import { calculateTotalSum } from 'src/functions/calendar-day-income-dialog/calculate-total-sum';
import { insertDayIncomeRecords } from 'src/functions/calendar-day-income-dialog/insert-day-income-records';

import { CalendarIncomeDialogRecord } from 'src/models/income-yearly-report/calendar-income-dialog-record.model';

@Component({
  selector: 'app-day-income-report',
  templateUrl: './day-income-report.component.html',
  styleUrls: ['./day-income-report.component.css'],
  providers: [LoadingService],
})
export class DayIncomeReportComponent implements OnInit, OnDestroy {
  deletedDayIncome: DayIncome;
  createIncomeRecord: boolean;
  dayNumber: number;
  moment: any = moment;
  monthNumber: number;
  yearNumber: number;
  incomeTypes: IncomeType[];
  calendarYear: CalendarYear;
  dataSource: DayIncome[];
  sub: Subscription;
  urlSub: Subscription;
  date: string;
  totalSum: number = 0;
  previousUrl: string;
  displayedColumns = ['docNumber', 'incomeSum', 'edit', 'delete'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loadingService: LoadingService,
    public calendarYearViewService: CalendarYearViewService,
    private calendarYearService: CalendarYearService,
    private timeService: TimeService,
    private matDialog: MatDialog,
    private snackbar: BasicSnackbarService,
    private urlService: UrlService
  ) {
    this.dayNumber = this.route.snapshot.queryParams['dayNumber'];
    this.monthNumber = this.route.snapshot.queryParams['monthNumber'];
    this.yearNumber = this.route.snapshot.queryParams['yearNumber'];
    this.createIncomeRecord = this.route.snapshot.queryParams['create'];
  }

  ngOnInit(): void {
    this.urlSub = this.urlService.previousUrl$.subscribe((previousUrl) => {
      this.previousUrl = previousUrl;
    });

    this.sub = this.calendarYearViewService.calendarYearDataSub$.subscribe(
      (value: CalendarYearData) => {
        if (
          value.incomeTypes &&
          value.incomeTypes.length > 0 &&
          value.calendarYear
        ) {
          this.incomeTypes = value.incomeTypes;
          this.calendarYear = value.calendarYear;
          console.log('incomeTypes', value.incomeTypes);
          console.log('calendarYear', value.calendarYear);
          this.dataSource = getDayIncomeRecords(
            this.dayNumber,
            this.monthNumber,
            this.calendarYear
          );

          console.log('DS', this.dataSource);
          this.date = this.timeService.get_DD_MMMM_YYYY_Str(
            this.dayNumber,
            this.monthNumber,
            this.yearNumber
          );

          this.totalSum = calculateTotalSum(this.dataSource);
        }
      }
    );
  }

  addIncomeRecord() {
    const dialogConfig = new MatDialogConfig();
    const data: CalendarIncomeDialogRecord = {
      title: defaults.addIncomeRecordTitle,
      dayNumber: this.dayNumber,
      monthNumber: this.monthNumber,
      calendarYear: this.calendarYear,
      date: this.date,
      incomeTypes: this.incomeTypes,
      yearNumber: this.yearNumber,
    };

    dialogConfig.data = data;
    const dialogRef = this.matDialog.open(
      DayIncomeDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      (data: DayIncome[]) => {
        if (data) {
          console.log('added data', data);
          this.dataSource = [...data];
          this.totalSum = calculateTotalSum(this.dataSource);
        }
      },
      (error) => {
        this.snackbar.open('Упппссс... Произошла ошибка!', MessageType.WARNING);
      }
    );
  }

  editIncomeRecord(dayIncome: DayIncome) {
    const dialogConfig = new MatDialogConfig();
    const data: CalendarIncomeDialogRecord = {
      title: defaults.editIncomeRecordTitle,
      dayNumber: this.dayNumber,
      monthNumber: this.monthNumber,
      calendarYear: this.calendarYear,
      date: this.date,
      incomeTypes: this.incomeTypes,
      dayIncome: dayIncome,
      yearNumber: this.yearNumber,
    };

    dialogConfig.data = data;
    const dialogRef = this.matDialog.open(
      DayIncomeDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data: DayIncome[]) => {
      if (data) {
        this.dataSource = [...data];
        this.totalSum = calculateTotalSum(this.dataSource);
      }
    });
  }

  deleteIncomeRecord(index: number, dayIncome: DayIncome) {
    console.log('DI', dayIncome);
    console.log(index);
    const data = this.dataSource.filter((value, i) => index != i);
    this.deletedDayIncome = dayIncome;
    this.loadingService.loadingOn();
    const calendarYear = insertDayIncomeRecords(
      this.dayNumber,
      this.monthNumber,
      this.calendarYear,
      data
    );

    this.calendarYearService
      .updateCalendarYear$(calendarYear)
      .pipe(delay(400))
      .subscribe(() => {
        this.loadingService.loadingOff();
        this.dataSource = [...data];
        this.totalSum = calculateTotalSum(this.dataSource);
      });
  }

  backToMonthIncomeReport() {
    const url = `${this.previousUrl.split('?')[0]}?yearNumber=${
      this.yearNumber
    }&monthNumber=${this.monthNumber}`;
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.urlSub.unsubscribe();
  }
}
