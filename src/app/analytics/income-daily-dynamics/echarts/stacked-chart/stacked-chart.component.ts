import { Component, Input, OnInit } from '@angular/core';
import { createStackedEchartOptions } from 'src/functions/income-daily-stacked-echart/create-stacked-echart-options';
import { getGrouppedMonthIncomes } from 'src/functions/income-daily-stacked-echart/get-groupped-month-incomes';
import { EChartOption } from 'echarts';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css'],
})
export class StackedChartComponent implements OnInit {
  @Input() calendarMonth: CalendarMonth;
  chartOption: any; //EChartsOption;

  constructor() {}

  ngOnInit(): void {
    // CREATE STACKED ECHART
    const incomes = getGrouppedMonthIncomes(this.calendarMonth);
    this.chartOption = createStackedEchartOptions(incomes);
    console.log('stacked chart', this.chartOption);
  }
}
