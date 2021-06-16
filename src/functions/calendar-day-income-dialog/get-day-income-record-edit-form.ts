import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayIncome } from 'src/models/income-yearly-report/day-income.model';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';
import { getIncomeTypeIndex } from './get-income-type-index';

export function getDayIncomeRecordEditForm(
  dayIncome: DayIncome,
  incomeTypes: IncomeType[]
) {
  const incomeTypeIndex: number = getIncomeTypeIndex(dayIncome, incomeTypes);
  const fb = new FormBuilder();
  const form: FormGroup = fb.group({
    docNumber: [dayIncome.docNumber],
    incomeSum: [
      dayIncome.incomeSum,
      Validators.compose([Validators.required, Validators.min(0.01)]),
    ],
    incomeTypeId: [
      incomeTypes[incomeTypeIndex].id,
      Validators.compose([Validators.required]),
    ],
  });
  return form;
}
