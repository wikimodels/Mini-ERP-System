import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BasicSnackbarService } from 'src/app/basic-snackbar/basic-snackbar.service';
import { MessageType } from 'src/app/basic-snackbar/models/message-type';
import { CalendarYearViewService } from 'src/app/services/calendar-services/calendar-year-view.service';
import { CALENDAR_YEAR } from 'src/consts/url-consts';
import { getAddCalendarYearDialogData } from 'src/functions/calendar-year-dialog/get-add-calendar-year-dialog-data';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { CalendarYearDialogComponent } from '../calendar-year-dialog/calendar-year-dialog.component';

@Component({
  selector: 'app-no-calendar-year',
  templateUrl: './no-calendar-year.component.html',
  styleUrls: ['./no-calendar-year.component.css'],
})
export class NoCalendarYearComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private snackbar: BasicSnackbarService,
    private router: Router,
    private CalendarYearViewService: CalendarYearViewService
  ) {}

  ngOnInit(): void {}

  addCalenderYear() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = getAddCalendarYearDialogData();
    const dialogRef = this.matDialog.open(
      CalendarYearDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      (data: CalendarYear) => {
        if (data) {
          this.CalendarYearViewService.fetchCalendarYearDataByYearId(data.id);
          this.router.navigate([CALENDAR_YEAR]);
        }
      },
      (error) => {
        this.snackbar.open('Упппссс... Произошла ошибка!', MessageType.WARNING);
      }
    );
  }
}
