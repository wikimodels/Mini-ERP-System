import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IncomeMonthlyReport } from 'src/models/income-monthly-report/income-monthly-report.model';
import { MonthData } from 'src/models/income-monthly-report/month-data.model';
@Injectable({
  providedIn: 'any',
})
// 'dayDate', 'docNumber', 'incomeTypeName', 'incomeSum'
export class ChbxService {
  // SHOW TABLE
  private _showTableSubj = new BehaviorSubject<MonthData>(undefined);
  showTableSubj$ = this._showTableSubj.asObservable();

  setShowTableSubj(value: MonthData): void {
    this._showTableSubj.next(value);
  }

  getShowTableSubj(): MonthData {
    return this._showTableSubj.getValue();
  }

  setShowTablesToTrue(incomeMonthlyReports: IncomeMonthlyReport[]) {
    incomeMonthlyReports.forEach((item) => {
      const obj: MonthData = {
        longMonthName: item.longMonthName,
        monthNumber: item.monthNumber,
        showTable: true,
      };
      this.setShowTableSubj(obj);
    });
  }
}
