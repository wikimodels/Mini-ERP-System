import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { AppMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaxPaymentsComponent } from './tax-payments/tax-payments.component';
import { ActivityComponent } from './activity/activity.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { DataTableComponent } from './income-list/data-table/data-table.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { DefaultRouteReuseStrategy } from '../default-route-reuse-strategy';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { CombinedChartComponent } from './income-daily-dynamics/echarts/combined-chart/combined-chart.component';
import { StackedChartComponent } from './income-daily-dynamics/echarts/stacked-chart/stacked-chart.component';
import { EchartsComponent } from './income-daily-dynamics/echarts/echarts.component';
import { IncomeMonthlyDynamicsComponent } from './income-monthly-dynamics/income-monthly-dynamics.component';
import { IncomeDailyDynamicsComponent } from './income-daily-dynamics/income-daily-dynamics.component';

@NgModule({
  declarations: [
    AnalyticsComponent,
    TaxPaymentsComponent,
    ActivityComponent,
    IncomeListComponent,
    IncomeDailyDynamicsComponent,
    DataTableComponent,
    CheckboxComponent,
    CombinedChartComponent,
    StackedChartComponent,
    EchartsComponent,
    IncomeMonthlyDynamicsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnalyticsRoutingModule,
    FlexLayoutModule,
    AppMaterialModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
  exports: [AnalyticsComponent],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: DefaultRouteReuseStrategy,
    },
  ],
})
export class AnalyticsModule {}
