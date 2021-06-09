import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IncomeTypesService } from 'src/app/services/income-reports/income-types.service';

export class IncomeTypeAsyncValidator {
  static createValidator(
    incomeTypeServcie: IncomeTypesService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return incomeTypeServcie.checkIncomeTypeInDb$(control.value).pipe(
        map((result) => {
          console.log('Validator result', result);
          const hasError =
            result === false ? null : { invalidIncomeTypeAsync: true };
          return hasError;
        })
      );
    };
  }
}
