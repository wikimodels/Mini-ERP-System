import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarDayIncomeService } from 'src/app/services/calendar-services/calendar-day-income.service';
import { CalendarYearCrudService } from 'src/app/services/calendar-services/calendar-year-crud.service';

import { LoadingService } from 'src/app/services/shared/loading.service';
import { getDayIncomeRecordForm } from 'src/functions/calendar-day-income-dialog/get-day-income-record-form';

import { CalendarIncomeDialogRecord } from 'src/models/income-yearly-report/calendar-income-dialog-record.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

@Component({
  selector: 'app-calendar-income-dialog',
  templateUrl: './calendar-income-dialog.component.html',
  styleUrls: ['./calendar-income-dialog.component.css'],
})
export class CalendarIncomeDialogComponent implements OnInit {
  form: FormGroup;
  incomeTypes: IncomeType[];
  constructor(
    public loadingService: LoadingService,
    private calendarDayIncomeService: CalendarDayIncomeService,
    public dialogRef: MatDialogRef<CalendarIncomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarIncomeDialogRecord
  ) {}

  ngOnInit(): void {
    this.form = getDayIncomeRecordForm(this.data.incomeTypes);
    this.incomeTypes = this.data.incomeTypes;
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      this.loadingService.loadingOn();
      const { docNumber, incomeSum, incomeTypeId } = this.form.value;
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
        .subscribe(() => {
          this.dialogRef.close({ date: this.data.date, sum: incomeSum });
        });
    }
  }

  cancel() {
    this.dialogRef.close(undefined);
  }
}
