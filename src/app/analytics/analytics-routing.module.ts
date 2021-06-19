import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ACTIVITY,
  INCOME_DAILY_DYNAMICS,
  INCOME_LIST,
  INCOME_MONTHLY_DYNAMICS,
  TAX_PAYMENTS,
} from 'src/consts/url-consts';

import { ActivityComponent } from './activity/activity.component';

import { AnalyticsComponent } from './analytics.component';
import { IncomeDailyDynamicsComponent } from './income-daily-dynamics/income-daily-dynamics.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { IncomeMonthlyDynamicsComponent } from './income-monthly-dynamics/income-monthly-dynamics.component';

import { TaxPaymentsComponent } from './tax-payments/tax-payments.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
  },
  {
    path: ACTIVITY,
    component: ActivityComponent,
  },
  {
    path: INCOME_MONTHLY_DYNAMICS,
    component: IncomeMonthlyDynamicsComponent,
  },
  {
    path: INCOME_LIST,
    component: IncomeListComponent,
  },
  {
    path: INCOME_DAILY_DYNAMICS,
    component: IncomeDailyDynamicsComponent,
  },
  {
    path: TAX_PAYMENTS,
    component: TaxPaymentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
