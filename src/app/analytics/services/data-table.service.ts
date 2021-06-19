import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MonthDataApi } from 'src/models/income-monthly-report/month-data-api.model';
import * as defaults from 'src/assets/utils/defaults.json';
@Injectable({
  providedIn: 'root',
})
// 'dayDate', 'docNumber', 'incomeTypeName', 'incomeSum'
export class DataTableService {
  previousDirection = 'desc';

  tableData$(
    tableData$,
    sortChange$,
    paginatorPage$
  ): Observable<MonthDataApi> {
    return combineLatest(
      tableData$.pipe(startWith(defaults.monthDataApi)),
      sortChange$.pipe(startWith(defaults.sortChange)),
      paginatorPage$.pipe(startWith(defaults.sortedItem))
    ).pipe(
      map((value) => {
        let [monthDataApi, page, sort] = value;

        const prop = sort['active']; // === 'flagUrl' ? 'country' : sort['active'];

        if (sort['direction'] === 'asc' && prop === 'incomeSum') {
          monthDataApi['incomeMonthlyRecords'].sort(
            (a, b) => a[prop] - b[prop]
          );
        }

        if (sort['direction'] === 'desc' && prop === 'incomeSum') {
          monthDataApi['incomeMonthlyRecords'].sort(
            (a, b) => b[prop] - a[prop]
          );
        }

        // INCOME TYPE NAME PROP (A WAY TO COMPARE STRINGS)
        if (
          sort['direction'] === 'asc' &&
          (prop === 'incomeTypeName' || prop === 'docNumber')
        ) {
          monthDataApi['incomeMonthlyRecords'].sort((a, b) =>
            a.incomeTypeName.localeCompare(b.incomeTypeName)
          );
        }
        if (
          sort['direction'] === 'desc' &&
          (prop === 'incomeTypeName' || prop === 'docNumber')
        ) {
          monthDataApi['incomeMonthlyRecords'].sort((a, b) =>
            b.incomeTypeName.localeCompare(a.incomeTypeName)
          );
        }

        // DAYDATE PROP (A WAY TO COMPARE TIME)
        if (sort['direction'] === 'asc' && prop === 'dayDate') {
          console.log('time asc', prop);

          monthDataApi['incomeMonthlyRecords'].sort(
            (a, b) => a[prop] - b[prop]
          );
        }

        if (sort['direction'] === 'desc' && prop === 'dayDate') {
          monthDataApi['incomeMonthlyRecords'].sort(
            (a, b) => b[prop] - a[prop]
          );
        }

        if (sort['direction'] != this.previousDirection) {
          page['pageIndex'] = 0;
          this.previousDirection = sort['direction'];
        }

        const array = monthDataApi['incomeMonthlyRecords'].slice(
          page['pageIndex'] * page['pageSize'],
          page['pageIndex'] * page['pageSize'] + page['pageSize']
        );

        const obj: MonthDataApi = {
          incomeMonthlyRecords: array,
          recordsCount: monthDataApi['incomeMonthlyRecords'].length,
        };

        return obj;
      })
    );
  }
}
