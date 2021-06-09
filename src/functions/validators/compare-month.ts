import { AbstractControl, ValidationErrors } from '@angular/forms';

export function compareMonths(
  control: AbstractControl
): ValidationErrors | null {
  const monthActivityStart = control.get('monthActivityStart').value;
  console.log('MAS', monthActivityStart);
  const monthActivityEnd = control.get('monthActivityEnd').value;
  console.log('MAE', monthActivityEnd);
  if (
    monthActivityStart != '' &&
    monthActivityEnd != '' &&
    monthActivityStart > monthActivityEnd
  ) {
    return { endLessThanStart: true };
  }
  return null;
}
