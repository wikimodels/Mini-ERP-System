import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { BasicSnackbarService } from 'src/app/basic-snackbar/basic-snackbar.service';
import { MessageType } from 'src/app/basic-snackbar/models/message-type';
import { CalendarYearViewService } from 'src/app/services/calendar-services/calendar-year-view.service';
import { TimeService } from 'src/app/services/shared/time.service';
import { DAY_INCOME_REPORT } from 'src/consts/url-consts';
import * as defaults from '../../../assets/utils/defaults.json';
import { CalendarDay } from 'src/models/calendar-year/calendar-day.model';
import { DayActivityType } from 'src/models/enums/day-activity-type.enum';
import { DayCSS } from 'src/models/enums/day-css.enum';
import { DayMomentumType } from 'src/models/enums/day-momentum-type.enum';

import { CalendarIncomeDialogRecord } from 'src/models/income-yearly-report/calendar-income-dialog-record.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

import { CalendarIncomeDialogComponent } from '../calendar-income-dialog/calendar-income-dialog.component';
@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css'],
  providers: [],
})
export class CalendarDayComponent implements OnInit, OnDestroy {
  @Input() day: CalendarDay;
  @Input() incomeTypes: IncomeType[];
  dayDisabled: boolean;
  dayIsWorking: boolean;
  date: string;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private snackbar: BasicSnackbarService,
    private timeService: TimeService,
    private calendarYearViewService: CalendarYearViewService,
    public deviceDetectorService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.dayDisabled =
      this.day.dayMomentumType === DayMomentumType.BEFORE ||
      this.day.dayMomentumType === DayMomentumType.AFTER
        ? true
        : false;

    this.dayIsWorking =
      this.day.dayActivityType === DayActivityType.WORKING ? true : false;

    this.date = this.timeService.get_DD_MMMM_YYYY_Str(
      this.day.dayNumber,
      this.day.monthNumber,
      this.day.yearNumber
    );
  }

  addIncomeRecord() {
    const dialogConfig = new MatDialogConfig();
    const data: CalendarIncomeDialogRecord = {
      title: defaults.addIncomeRecordTitle,
      dayNumber: this.day.dayNumber,
      monthNumber: this.day.monthNumber,
      date: this.date,
      incomeTypes: this.incomeTypes,
      yearNumber: this.day.yearNumber,
    };

    dialogConfig.data = data;
    const dialogRef = this.matDialog.open(
      CalendarIncomeDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      (value: { date: string; sum: number }) => {
        if (value) {
          this.snackbar.open(
            `${value.date}: ${value.sum}руб`,
            MessageType.INFO
          );
        }
      },
      (error) => {
        this.snackbar.open('Упппссс... Произошла ошибка!', MessageType.WARNING);
      }
    );
  }

  changeToWorkingDay() {
    // this.vibrationService.vibrate({ duration: 10, interval: 1, count: 1 });
    this.dayIsWorking = true;
    this.day.dayCSS = DayCSS.DAY_WORKING;
    this.day.dayActivityType = DayActivityType.WORKING;
    this.calendarYearViewService.updateCalendarDay(this.day);
  }

  changeToDayOff() {
    this.dayIsWorking = false;
    this.day.dayCSS = DayCSS.DAY_OFF;
    this.day.dayActivityType = DayActivityType.DAY_OFF;
    this.day.dayIncomes = [];
    this.calendarYearViewService.updateCalendarDay(this.day);
  }

  changeToUndefinedDay() {
    this.dayIsWorking = false;
    this.day.dayCSS = DayCSS.DAY_UNDEFINED;
    this.day.dayActivityType = DayActivityType.NOT_DEFINED;
    this.day.dayIncomes = [];
    this.calendarYearViewService.updateCalendarDay(this.day);
  }

  seeDayIncomes() {
    this.router.navigate([DAY_INCOME_REPORT], {
      queryParams: {
        yearNumber: this.day.yearNumber,
        monthNumber: this.day.monthNumber,
        dayNumber: this.day.dayNumber,
      },
    });
  }

  ngOnDestroy() {}
}
