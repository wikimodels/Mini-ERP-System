import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IncomeTypeService } from 'src/app/services/core/income-type.service';

export class IncomeTypeAsyncValidator {
  static createValidator(
    incomeTypeService: IncomeTypeService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return incomeTypeService.checkIncomeTypeInDb$(control.value).pipe(
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
