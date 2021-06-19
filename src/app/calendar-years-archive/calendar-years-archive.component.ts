import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import {
  CALENDAR_YEAR,
  CALENDAR_YEARS_TAXES_PARAMS,
  MONTHS_INCOME_REPORT,
} from 'src/consts/url-consts';
import { getCalendarYearsArchiveCreateDialogData } from 'src/functions/calendar-years-achive/get-calendar-years-archive-create-dialog-data';
import { getCalendarYearsArchiveDeleteDialogData } from 'src/functions/calendar-years-achive/get-calendar-years-archive-delete-dialog-data';
import { getCalendarYearsArchiveUpdateDialogData } from 'src/functions/calendar-years-achive/get-calendar-years-archive-update-dialog-data';

import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

import { BasicSnackbarService } from '../basic-snackbar/basic-snackbar.service';
import { MessageType } from '../basic-snackbar/models/message-type';
import { NavBarService } from '../services/calendar-services/nav-bar.service';
import { CalendarYearService } from '../services/core/calendar-year.service';
import { CalendarYearsArchiveDialogComponent } from './calendar-years-archive-dialog/calendar-years-archive-dialog.component';

@Component({
  selector: 'app-calendar-years-archive',
  templateUrl: './calendar-years-archive.component.html',
  styleUrls: ['./calendar-years-archive.component.css'],
})
export class CalendarYearsArchiveComponent implements OnInit, OnDestroy {
  moment: any = moment;
  sub: Subscription;
  dataSource: CalendarYear[] = [];
  displayedColumns = ['calendarYear', 'workingPeriod', 'options'];
  constructor(
    private navbarService: NavBarService,
    private calenarYearsService: CalendarYearService,
    private router: Router,
    private matDialog: MatDialog,
    private snackbar: BasicSnackbarService
  ) {}

  ngOnInit(): void {
    this.sub = this.calenarYearsService
      .calendarYeasByEmail$()
      .subscribe((years) => {
        this.dataSource = years;
      });
  }

  addCalendarYear() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = getCalendarYearsArchiveCreateDialogData();
    const dialogRef = this.matDialog.open(
      CalendarYearsArchiveDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      (data: CalendarYear[]) => {
        if (data) {
          this.dataSource = [...data];
          this.navbarService.getYearNumbers();
        }
      },
      (error) => {
        this.snackbar.open('Упппссс... Произошла ошибка!', MessageType.WARNING);
      }
    );
  }

  editCalendarYear(calendarYear: CalendarYear) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = getCalendarYearsArchiveUpdateDialogData(calendarYear);
    const dialogRef = this.matDialog.open(
      CalendarYearsArchiveDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data: CalendarYear[]) => {
      if (data) {
        this.dataSource = [...data];
      }
    });
  }

  deleteCalendarYear(calendarYear: CalendarYear) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = getCalendarYearsArchiveDeleteDialogData(calendarYear);
    const dialogRef = this.matDialog.open(
      CalendarYearsArchiveDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data: CalendarYear[]) => {
      if (data) {
        this.dataSource = [...data];
        // this.calendarService.getCalendarYearNumbers();
      }
    });
  }

  goToCalendarYearTaxesParams(workingYear: CalendarYear) {
    this.router.navigate([CALENDAR_YEARS_TAXES_PARAMS], {
      queryParams: {
        yearId: workingYear.id,
      },
    });
  }
  goToCalendarView(calendarYear: CalendarYear) {
    this.router.navigate([CALENDAR_YEAR], {
      queryParams: {
        yearNumber: calendarYear.yearNumber,
        email: calendarYear.email,
      },
    });
  }
  goToReport(calendarYear: CalendarYear) {}

  goToIncomeJournal(calendarYear: CalendarYear) {
    this.router.navigate([MONTHS_INCOME_REPORT], {
      queryParams: {
        yearNumber: calendarYear.yearNumber,
        email: calendarYear.email,
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
