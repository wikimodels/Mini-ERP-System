import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicSnackbarModule } from './basic-snackbar/basic-snackbar.module';
import { AppMaterialModule } from './material.module';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CalendarYearComponent } from './calendar-year/calendar-year.component';
import { CalendarMonthComponent } from './calendar-year/calendar-month/calendar-month.component';
import { CalendarDayComponent } from './calendar-year/calendar-day/calendar-day.component';
import { CalendarIncomeDialogComponent } from './calendar-year/calendar-income-dialog/calendar-income-dialog.component';
import { NoCalendarYearComponent } from './calendar-year/no-calendar-year/no-calendar-year.component';
import { CalendarYearDialogComponent } from './calendar-year/calendar-year-dialog/calendar-year-dialog.component';
import { RouteReuseStrategy } from '@angular/router';
import { DefaultRouteReuseStrategy } from './default-route-reuse-strategy';
import { DeleteItemDialogComponent } from './delete-item-dialog/delete-item-dialog.component';
import { DayIncomeReportComponent } from './day-income-report/day-income-report.component';
import { DayIncomeDialogComponent } from './day-income-report/day-income-dialog/day-income-dialog.component';
import { IncomeTypesComponent } from './income-types/income-types.component';
import { IncomeTypeDialogComponent } from './income-types/income-type-dialog/income-type-dialog.component';
import { CalendarYearsTaxesParamsComponent } from './calendar-years-taxes-params/calendar-years-taxes-params.component';
import { MonthsIncomeReportComponent } from './months-income-report/months-income-report.component';
import { MonthIncomeExpansionPanelComponent } from './months-income-report/month-income-expansion-panel/month-income-expansion-panel.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    AppMaterialModule,
    BasicSnackbarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    NavBarComponent,
    DeleteItemDialogComponent,
    CalendarYearComponent,
    CalendarYearsTaxesParamsComponent,
    CalendarMonthComponent,
    CalendarDayComponent,
    CalendarIncomeDialogComponent,
    CalendarYearDialogComponent,
    NoCalendarYearComponent,
    DayIncomeReportComponent,
    DayIncomeDialogComponent,
    IncomeTypeDialogComponent,
    IncomeTypesComponent,
    MonthIncomeExpansionPanelComponent,
    MonthsIncomeReportComponent,
  ],

  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: DefaultRouteReuseStrategy,
    },
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
