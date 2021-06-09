import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';

export class YearAsyncValidator {
  static createValidator(
    calendarYearService: CalendarYearService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return calendarYearService.checkYearNumberInDb(control.value).pipe(
        map((result) => {
          console.log('Validator result', result);
          const hasError = result === false ? null : { invalidYearAsync: true };
          return hasError;
        })
      );
    };
  }
}
