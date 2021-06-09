import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IncomeTypesService } from 'src/app/services/income-reports/income-types.service';

export class IncomeTypeEditAsyncValidator {
  static createValidator(
    incomeTypeServcie: IncomeTypesService,
    initialValue: string
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return incomeTypeServcie.checkIncomeTypeInDb$(control.value).pipe(
        map((result) => {
          console.log('Validator result', result);
          console.log('initial value', initialValue);
          const hasError =
            result === false ||
            (result === true && initialValue === control.value)
              ? null
              : { invalidIncomeTypeAsync: true };
          return hasError;
        })
      );
    };
  }
}
