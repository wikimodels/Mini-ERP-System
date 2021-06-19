import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { CalendarYearCrudService } from 'src/app/services/calendar-services/calendar-year-crud.service';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';
import { AuthService } from 'src/app/services/shared/auth.service';

import { LoadingService } from 'src/app/services/shared/loading.service';
import { MONTHS } from 'src/consts/months';
import { YEARS } from 'src/consts/years';
import { getCalendarYearCreateDialogForm } from 'src/functions/calendar-year-dialog/get-calendar-year-create-dialog-form';
import { getCalendarYearDeleteDialogForm } from 'src/functions/calendar-years-achive/get-calendar-year-delete-dialog-form';
import { getCalendarYearEditDialogForm } from 'src/functions/calendar-years-achive/get-calendar-year-edit-dialog-form';
import { copyCalendarYear } from 'src/functions/copy-calendaer-year';
import { fillInCalendarYear } from 'src/functions/fill-in-calendar-year';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

import { CalendarYearsArchiveDialogData } from 'src/models/calendar-years-archive/calendar-years-archive-dialog-data.model';

@Component({
  selector: 'app-calendar-years-archive-dialog',
  templateUrl: './calendar-years-archive-dialog.component.html',
  styleUrls: ['./calendar-years-archive-dialog.component.css'],
})
export class CalendarYearsArchiveDialogComponent implements OnInit {
  months = MONTHS;
  years = YEARS;

  form: FormGroup;
  constructor(
    public loadingService: LoadingService,
    public authService: AuthService,
    private calendarYearCrudService: CalendarYearCrudService,
    public dialogRef: MatDialogRef<CalendarYearsArchiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarYearsArchiveDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.actionType === 'create') {
      this.form = getCalendarYearCreateDialogForm();
      console.log(this.form);
    }
    if (this.data.actionType === 'update') {
      this.form = getCalendarYearEditDialogForm(this.data.calendarYear);
    }
    if (this.data.actionType === 'delete') {
      this.form = getCalendarYearDeleteDialogForm(this.data.calendarYear);
    }
  }

  onSubmit() {
    this.loadingService.loadingOn();
    if (this.form.status === 'VALID' && this.data.actionType === 'create') {
      const { yearNumber, monthActivityStart, monthActivityEnd } =
        this.form.value;

      this.calendarYearCrudService
        .createCalendarYear$(monthActivityStart, monthActivityEnd, yearNumber)
        .subscribe(
          (value: CalendarYear[]) => {
            this.dialogRef.close(value);
          },
          (error) => {
            this.dialogRef.close(undefined);
          }
        );
    }

    if (this.form.status === 'VALID' && this.data.actionType === 'update') {
      const { monthActivityStart, monthActivityEnd } = this.form.value;

      this.calendarYearCrudService
        .updateCalendarYear$(
          monthActivityStart,
          monthActivityEnd,
          this.data.calendarYear
        )
        .subscribe(
          (value: CalendarYear[]) => {
            this.dialogRef.close(value);
          },
          (error) => {
            this.dialogRef.close(undefined);
          }
        );
    }

    if (this.data.actionType === 'delete') {
      console.log(this.form);
      this.calendarYearCrudService
        .deleteCalendarYear$(this.data.calendarYear)
        .subscribe(
          (value: CalendarYear[]) => {
            this.dialogRef.close(value);
          },
          (error) => {
            this.dialogRef.close(undefined);
          }
        );
    }
  }
  cancel() {
    this.dialogRef.close(undefined);
  }
}
