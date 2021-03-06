import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingService } from 'src/app/services/shared/loading.service';
import { MONTHS } from 'src/consts/months';
import { YEARS } from 'src/consts/years';
import { getCalendarYearEditForm } from 'src/functions/calendar-year-dialog/get-calendar-year-edit-form';

import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

import { CalendarYearDialogRecord } from 'src/models/calendar-year/calendar-year-dialog-record.model';
import { DeleteItemDialogComponent } from 'src/app/delete-item-dialog/delete-item-dialog.component';

import { CalendarYearCrudService } from 'src/app/services/calendar-services/calendar-year-crud.service';
import { getCalendarYearCreateDialogForm } from 'src/functions/calendar-year-dialog/get-calendar-year-create-dialog-form';

@Component({
  selector: 'app-calendar-year-dialog',
  templateUrl: './calendar-year-dialog.component.html',
  styleUrls: ['./calendar-year-dialog.component.css'],
})
export class CalendarYearDialogComponent implements OnInit {
  months = MONTHS;
  years = YEARS;
  form: FormGroup;
  constructor(
    public loadingService: LoadingService,
    public dialogRef: MatDialogRef<DeleteItemDialogComponent>,
    private calendarYearCrudService: CalendarYearCrudService,
    @Inject(MAT_DIALOG_DATA) public data: CalendarYearDialogRecord
  ) {}

  ngOnInit(): void {
    if (this.data.actionType === 'create') {
      this.form = getCalendarYearCreateDialogForm();
      console.log(this.form);
    }

    if (this.data.actionType === 'update') {
      this.form = getCalendarYearEditForm(this.data.calendarYear);
    }

    if (this.data.actionType === 'delete') {
      this.form = getCalendarYearEditForm(this.data.calendarYear);
    }
  }

  onSubmit() {
    if (this.form.status === 'VALID' && this.data.actionType === 'create') {
      this.loadingService.loadingOn();
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
      this.loadingService.loadingOn();
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
      this.loadingService.loadingOn();
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
