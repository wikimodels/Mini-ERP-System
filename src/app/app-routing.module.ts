import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CALENDAR_YEAR,
  DAY_INCOME_REPORT,
  NO_CALENDAR_YEAR,
} from 'src/consts/url-consts';
import { CalendarYearComponent } from './calendar-year/calendar-year.component';
import { NoCalendarYearComponent } from './calendar-year/no-calendar-year/no-calendar-year.component';
import { DayIncomeReportComponent } from './day-income-report/day-income-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: CALENDAR_YEAR,
    pathMatch: 'full',
  },
  {
    path: CALENDAR_YEAR,
    component: CalendarYearComponent,
  },
  {
    path: NO_CALENDAR_YEAR,
    component: NoCalendarYearComponent,
  },
  {
    path: DAY_INCOME_REPORT,
    component: DayIncomeReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
