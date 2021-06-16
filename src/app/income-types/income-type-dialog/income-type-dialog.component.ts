import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteItemDialogComponent } from 'src/app/delete-item-dialog/delete-item-dialog.component';

import { LoadingService } from 'src/app/services/shared/loading.service';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

import { IncomeTypeDialogRecord } from 'src/models/income-type-dialog-record.model';
import { IncomeTypeService } from 'src/app/services/core/income-type.service';
import { getIncomeTypeForm } from 'src/functions/income-types/get-income-type-form';
import { getIncomeTypeEditForm } from 'src/functions/income-types/get-income-type-edit-form';
import { CalendarYearData } from 'src/models/calendar-year-data.model';
import { CalendarYearViewService } from 'src/app/services/calendar-services/calendar-year-view.service';

@Component({
  selector: 'app-income-type-dialog',
  templateUrl: './income-type-dialog.component.html',
  styleUrls: ['./income-type-dialog.component.css'],
})
export class IncomeTypeDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    public loadingService: LoadingService,
    private calendarYearViewService: CalendarYearViewService,
    private incomeTypeService: IncomeTypeService,
    public dialogRef: MatDialogRef<DeleteItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncomeTypeDialogRecord
  ) {}

  ngOnInit(): void {
    if (!this.data.incomeType) {
      this.form = getIncomeTypeForm();
    } else {
      this.form = getIncomeTypeEditForm(this.data.incomeType);
    }
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      this.loadingService.loadingOn();

      //ADD INCOME TYPE
      if (!this.data.incomeType) {
        this.incomeTypeService.addIncomeTypeRecord$(this.form.value).subscribe(
          (value: IncomeType[]) => {
            this.dialogRef.close(value);
          },
          (error) => {
            this.dialogRef.close(undefined);
          }
        );
      }

      //EDIT INCOME TYPE
      if (this.data.incomeType) {
        console.log('data IT', this.data);
        const { typeName } = this.form.value;
        this.incomeTypeService
          .editIncomeTypeRecord$(this.data.incomeType, typeName)
          .subscribe(
            (value: CalendarYearData) => {
              this.dialogRef.close(value.incomeTypes);
              this.calendarYearViewService.setCalendarYearData(value);
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
