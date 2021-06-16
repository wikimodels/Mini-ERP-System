import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

import { IncomeTypeDialogRecord } from 'src/models/income-type-dialog-record.model';
import { BasicSnackbarService } from '../basic-snackbar/basic-snackbar.service';
import { MessageType } from '../basic-snackbar/models/message-type';

import { LoadingService } from '../services/shared/loading.service';
import { IncomeTypeDialogComponent } from './income-type-dialog/income-type-dialog.component';
import { IncomeTypeService } from '../services/core/income-type.service';
import { CalendarYearViewService } from '../services/calendar-services/calendar-year-view.service';

@Component({
  selector: 'app-income-types',
  templateUrl: './income-types.component.html',
  styleUrls: ['./income-types.component.css'],
  providers: [LoadingService],
})
export class IncomeTypesComponent implements OnInit, OnDestroy {
  deletedItem: IncomeType;
  dataSource: IncomeType[];
  sub: Subscription;
  displayedColumns = ['orderNumber', 'typeName', 'edit', 'delete'];
  constructor(
    private incomeTypesService: IncomeTypeService,
    private calendarYearViewService: CalendarYearViewService,
    public loadingService: LoadingService,
    private snackbar: BasicSnackbarService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sub = this.incomeTypesService
      .incomeTypesByEmail$()
      .subscribe((value: IncomeType[]) => {
        this.dataSource = value;
      });
  }

  addIncomeType() {
    const dialogConfig = new MatDialogConfig();
    const data: IncomeTypeDialogRecord = {
      title: 'Новая запись',
      incomeType: undefined,
    };

    dialogConfig.data = data;
    const dialogRef = this.matDialog.open(
      IncomeTypeDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      (data: IncomeType[]) => {
        if (data) {
          this.dataSource = [...data];
        }
      },
      (error) => {
        this.snackbar.open('Упппссс... Произошла ошибка!', MessageType.WARNING);
      }
    );
  }

  editIncomeType(incomeType: IncomeType) {
    console.log('incomeType', incomeType);
    const dialogConfig = new MatDialogConfig();
    const data: IncomeTypeDialogRecord = {
      title: 'Редактирование запись',
      incomeType: incomeType,
    };

    dialogConfig.data = data;
    const dialogRef = this.matDialog.open(
      IncomeTypeDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      (data: IncomeType[]) => {
        if (data) {
          this.dataSource = [...data];
        }
      },
      (error) => {
        this.snackbar.open('Упппссс... Произошла ошибка!', MessageType.WARNING);
      }
    );
  }

  deleteIncomeType(incomeType: IncomeType) {
    this.loadingService.loadingOn();

    this.deletedItem = incomeType;
    this.incomeTypesService.deleteIncomeType$(incomeType).subscribe(
      (value: any) => {
        this.loadingService.loadingOff();
        if (value instanceof Array) {
          this.dataSource = [...value];
        } else {
          this.snackbar.open(
            'Удаление невозможно, т.к. запись используется в Базе Данных',
            MessageType.WARNING
          );
        }
      },
      (error: any) => {
        this.snackbar.open(
          'Упппс... Что-то пошло не так...',
          MessageType.WARNING
        );
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
