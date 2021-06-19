import { Component, OnInit, Input } from '@angular/core';

import { getEchartOption } from 'src/functions/income-daily-echart/get-echart-option';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';

@Component({
  selector: 'app-combined-chart',
  templateUrl: './combined-chart.component.html',
  styleUrls: ['./combined-chart.component.css'],
})
export class CombinedChartComponent implements OnInit {
  @Input() calendarMonth: CalendarMonth;
  chartOption: any; //EChartsOption;

  ngOnInit(): void {
    this.chartOption = getEchartOption(this.calendarMonth);
  }
}
