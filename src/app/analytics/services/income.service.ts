import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IncomeMonthlyReport } from 'src/models/income-monthly-report/income-monthly-report.model';
import { MonthDataApi } from 'src/models/income-monthly-report/month-data-api.model';
import { MonthData } from 'src/models/income-monthly-report/month-data.model';
import * as defaults from 'src/assets/utils/defaults.json';
import { IncomeMonthlyRecord } from 'src/models/income-monthly-report/income-monthly-record.model';

@Injectable({
  providedIn: 'any',
})
export class IncomeService {
  // MONTH TABLE API
  private _monthDataApiSubj = new BehaviorSubject<MonthDataApi>(
    defaults.monthDataApi
  );
  monthDataApiSubj$ = this._monthDataApiSubj.asObservable();

  setMonthDataApiSubj(value: IncomeMonthlyRecord[]) {
    const obj: MonthDataApi = {
      incomeMonthlyRecords: value,
      recordsCount: value.length,
    };
    this._monthDataApiSubj.next(obj);
  }
  getMonthDataApiSubj() {
    return this._monthDataApiSubj.getValue();
  }

  getMonthsData(incomeMonthlyReports: IncomeMonthlyReport[]): MonthData[] {
    const monthsData: MonthData[] = [];
    incomeMonthlyReports.forEach((i) => {
      let obj: MonthData = {
        monthNumber: i.monthNumber,
        longMonthName: i.longMonthName,
      };
      monthsData.push(obj);
    });
    return monthsData;
  }
}
