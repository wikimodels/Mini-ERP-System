import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';

export function getDayIncomeRecordForm(incomeTypes: IncomeType[]): FormGroup {
  const fb = new FormBuilder();
  return fb.group({
    docNumber: [''],
    incomeSum: [
      '',
      Validators.compose([Validators.required, Validators.min(0.01)]),
    ],
    incomeTypeId: [
      incomeTypes[0].id,
      Validators.compose([Validators.required]),
    ],
  });
}
