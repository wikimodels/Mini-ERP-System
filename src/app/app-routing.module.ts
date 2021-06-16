import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CALENDAR_YEAR,
  CALENDAR_YEARS_TAXES_PARAMS,
  DAY_INCOME_REPORT,
  INCOME_TYPES,
  MONTH_INCOME_REPORT,
  NO_CALENDAR_YEAR,
} from 'src/consts/url-consts';
import { CalendarYearComponent } from './calendar-year/calendar-year.component';
import { NoCalendarYearComponent } from './calendar-year/no-calendar-year/no-calendar-year.component';
import { CalendarYearsTaxesParamsComponent } from './calendar-years-taxes-params/calendar-years-taxes-params.component';
import { DayIncomeReportComponent } from './day-income-report/day-income-report.component';
import { IncomeTypesComponent } from './income-types/income-types.component';
import { MonthsIncomeReportComponent } from './months-income-report/months-income-report.component';

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
  {
    path: MONTH_INCOME_REPORT,
    component: MonthsIncomeReportComponent,
  },
  {
    path: INCOME_TYPES,
    component: IncomeTypesComponent,
  },
  {
    path: CALENDAR_YEARS_TAXES_PARAMS,
    component: CalendarYearsTaxesParamsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
