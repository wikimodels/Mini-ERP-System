import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function incomeValidators(): ValidationErrors | null {
  return Validators.compose([Validators.required]);
}
