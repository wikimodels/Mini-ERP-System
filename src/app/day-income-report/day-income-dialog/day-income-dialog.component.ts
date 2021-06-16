import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DeleteItemDialogComponent } from 'src/app/delete-item-dialog/delete-item-dialog.component';
import { CalendarDayIncomeService } from 'src/app/services/calendar-services/calendar-day-income.service';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';

import { LoadingService } from 'src/app/services/shared/loading.service';

import { getDayIncomeRecordEditForm } from 'src/functions/calendar-day-income-dialog/get-day-income-record-edit-form';
import { getDayIncomeRecordForm } from 'src/functions/calendar-day-income-dialog/get-day-income-record-form';
import { getDayIncomeRecords } from 'src/functions/calendar-day-income-dialog/get-day-income-records';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { CalendarIncomeDialogRecord } from 'src/models/income-yearly-report/calendar-income-dialog-record.model';

import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

@Component({
  selector: 'app-day-income-dialog',
  templateUrl: './day-income-dialog.component.html',
  styleUrls: ['./day-income-dialog.component.css'],
})
export class DayIncomeDialogComponent implements OnInit {
  form: FormGroup;
  incomeTypes: IncomeType[];

  constructor(
    public loadingService: LoadingService,
    private calendarDayIncomeService: CalendarDayIncomeService,
    public dialogRef: MatDialogRef<DeleteItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarIncomeDialogRecord
  ) {}

  ngOnInit(): void {
    if (!this.data.dayIncome) {
      this.form = getDayIncomeRecordForm(this.data.incomeTypes);
    } else {
      this.form = getDayIncomeRecordEditForm(
        this.data.dayIncome,
        this.data.incomeTypes
      );
    }
    this.incomeTypes = this.data.incomeTypes;
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      this.loadingService.loadingOn();
      const { docNumber, incomeSum, incomeTypeId } = this.form.value;

      //ADD DAYINCOME RECORD
      if (this.data.dayIncome === undefined) {
        this.calendarDayIncomeService
          .addIncomeRecord$(
            this.data.dayNumber,
            this.data.monthNumber,
            this.data.incomeTypes,
            this.data.date,
            docNumber,
            incomeSum,
            incomeTypeId
          )
          .subscribe(
            (value: CalendarYear) => {
              const dayIncomeItems = getDayIncomeRecords(
                this.data.dayNumber,
                this.data.monthNumber,
                value
              );
              console.log('dayIncomeItems', dayIncomeItems);
              this.dialogRef.close(dayIncomeItems);
            },
            (error) => {
              this.dialogRef.close(undefined);
            }
          );
      }

      //EDIT DAYINCOME RECORD
      if (this.data.dayIncome != undefined) {
        this.calendarDayIncomeService
          .editIncomeRecord$(
            this.data.dayNumber,
            this.data.monthNumber,
            this.data.calendarYear,
            this.data.incomeTypes,
            this.data.date,
            docNumber,
            incomeSum,
            incomeTypeId,
            this.data.dayIncome.id
          )
          .subscribe(
            (value: CalendarYear) => {
              console.log('edit value', value);
              const dayIncomeItems = getDayIncomeRecords(
                this.data.dayNumber,
                this.data.monthNumber,
                value
              );
              this.dialogRef.close(dayIncomeItems);
            },
            (error) => {
              this.dialogRef.close(undefined);
            }
          );
      }
    }
  }

  cancel() {
    this.dialogRef.close(undefined);
  }
}
