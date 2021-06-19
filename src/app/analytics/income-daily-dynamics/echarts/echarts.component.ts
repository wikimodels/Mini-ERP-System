import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';

import { MonthData } from 'src/models/income-monthly-report/month-data.model';
import { ChbxService } from '../../services/chbx.service';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.css'],
})
export class EchartsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() calendarMonth: CalendarMonth;
  showTable: boolean = true;
  sub: Subscription;
  constructor(private chbxService: ChbxService) {}

  ngOnInit(): void {
    const obj: MonthData = {
      longMonthName: this.calendarMonth.longMonthName,
      monthNumber: this.calendarMonth.monthNumber,
      showTable: true,
    };
    this.chbxService.setShowTableSubj(obj);
  }
  ngAfterViewInit() {
    this.sub = this.chbxService.showTableSubj$.subscribe((value) => {
      console.log('get value from subj', this.chbxService.getShowTableSubj());
      if (value && value.monthNumber === this.calendarMonth.monthNumber) {
        setTimeout(() => {
          console.log('chbx showTable', value);
          this.showTable = value.showTable;
          console.log('showTable', this.showTable);
        }, 0);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
