import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeTypeService } from 'src/app/services/core/income-type.service';

import {
  AUTH_SERVICE,
  CALENAR_YEAR_VIEW_SERVICE,
  CALENDAR_YEAR_SERVICE,
  HTTP,
  LOADING_SERVICE,
} from 'src/consts/services-consts';
import { IncomeTypeAsyncValidator } from '../validators/income-type-async-validator';

export function getIncomeTypeForm(): FormGroup {
  const fb = new FormBuilder();
  const service = new IncomeTypeService(
    AUTH_SERVICE,
    HTTP,
    LOADING_SERVICE,
    CALENDAR_YEAR_SERVICE,
    CALENAR_YEAR_VIEW_SERVICE
  );
  const form = fb.group({
    typeName: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(20)]),
      Validators.composeAsync([
        IncomeTypeAsyncValidator.createValidator(service),
      ]),
    ],
  });

  return form;
}
