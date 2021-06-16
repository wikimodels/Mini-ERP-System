import { FormArray, FormGroup } from '@angular/forms';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { createCalendarYearsTaxesParamsFormGroup } from './create-calendar-years-taxes-params-form-group';

export function getCalendarYearsTaxesParamsFormGroup(
  calendarYear: CalendarYear
) {
  let array: FormGroup[] = [];
  calendarYear.calendarMonths.forEach((a) => {
    array.push(createCalendarYearsTaxesParamsFormGroup(a));
  });
  let formGroup = new FormGroup({
    calendarMonths: new FormArray(array),
  });
  return formGroup;
}
