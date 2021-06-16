import { FormBuilder } from '@angular/forms';
import { CalendarMonth } from 'src/models/calendar-year/calendar-month.model';
import { incomeValidators } from '../validators/income-validators';
import { taxesValidators } from '../validators/taxes-validators';

export function createCalendarYearsTaxesParamsFormGroup(
  workingMonth: CalendarMonth
) {
  const fb = new FormBuilder();
  const fg = fb.group({
    longMonthName: [
      { value: workingMonth.monthSettings.longMonthName, disabled: true },
    ],
    income: [workingMonth.monthSettings.income, incomeValidators],
    socialTaxRate: [workingMonth.monthSettings.socialTaxRate, taxesValidators],
    pensionTaxRate: [
      workingMonth.monthSettings.pensionTaxRate,
      taxesValidators,
    ],
  });

  return fg;
}
