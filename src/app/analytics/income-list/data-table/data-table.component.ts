import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IncomeMonthlyRecord } from 'src/models/income-monthly-report/income-monthly-record.model';
import * as moment from 'moment';
import { IncomeService } from '../../services/income.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MonthDataApi } from 'src/models/income-monthly-report/month-data-api.model';
import { DataTableService } from '../../services/data-table.service';
import { ChbxService } from '../../services/chbx.service';
import { MonthData } from 'src/models/income-monthly-report/month-data.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  providers: [IncomeService],
})
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {
  showTable: boolean;
  moment: any = moment;
  sub: Subscription;
  monthDataApiSub: Subscription;
  displayedColumns = ['dayDate', 'docNumber', 'incomeTypeName', 'incomeSum'];
  dataSource: IncomeMonthlyRecord[];
  resultsLength = 0;

  @Input() incomeMonthlyRecords: IncomeMonthlyRecord[];
  @Input() monthNumber: number;
  @Input() longMonthName: string;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private incomeService: IncomeService,
    private dataTableService: DataTableService,
    private chbxService: ChbxService
  ) {}

  ngOnInit(): void {
    this.showTable = true;
    this.incomeService.setMonthDataApiSubj(this.incomeMonthlyRecords);
    console.log('showTable ngOnInit', this.showTable);
    const obj: MonthData = {
      longMonthName: this.longMonthName,
      monthNumber: this.monthNumber,
      showTable: true,
    };
    this.chbxService.setShowTableSubj(obj);
  }

  ngAfterViewInit() {
    this.sub = this.chbxService.showTableSubj$.subscribe((value) => {
      console.log('get value from subj', this.chbxService.getShowTableSubj());
      if (value && value.monthNumber === this.monthNumber) {
        setTimeout(() => {
          console.log('chbx showTable', value);
          this.showTable = value.showTable;
          console.log('showTable', this.showTable);
        }, 0);
      }
    });

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    this.dataTableService
      .tableData$(
        this.incomeService.monthDataApiSubj$,
        this.paginator.page,
        this.sort.sortChange
      )
      .subscribe((value: MonthDataApi) => {
        setTimeout(() => {
          this.dataSource = value.incomeMonthlyRecords;
          this.resultsLength = value.recordsCount;
        }, 0);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
