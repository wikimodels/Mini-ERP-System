import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeTypeService } from 'src/app/services/core/income-type.service';
import {
  AUTH_SERVICE,
  CALENAR_YEAR_VIEW_SERVICE,
  CALENDAR_YEAR_SERVICE,
  HTTP,
  LOADING_SERVICE,
} from 'src/consts/services-consts';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';
import { IncomeTypeEditAsyncValidator } from '../validators/income-type-edit-async-validator';

export function getIncomeTypeEditForm(incomeType: IncomeType): FormGroup {
  const service = new IncomeTypeService(
    AUTH_SERVICE,
    HTTP,
    LOADING_SERVICE,
    CALENDAR_YEAR_SERVICE,
    CALENAR_YEAR_VIEW_SERVICE
  );

  const fb = new FormBuilder();
  const form = fb.group({
    typeName: [
      incomeType.typeName,
      Validators.compose([Validators.required, Validators.maxLength(20)]),
      Validators.composeAsync([
        IncomeTypeEditAsyncValidator.createValidator(
          service,
          incomeType.typeName
        ),
      ]),
    ],
  });
  return form;
}
