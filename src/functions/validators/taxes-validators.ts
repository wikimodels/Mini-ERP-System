import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function taxesValidators(): ValidationErrors | null {
  return Validators.compose([
    Validators.required,
    Validators.min(0),
    Validators.max(100),
  ]);
}
