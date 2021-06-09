import { FormBuilder, Validators } from '@angular/forms';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { compareMonths } from '../validators/compare-month';

export function getCalendarYearEditForm(calendarYear: CalendarYear) {
  const fb = new FormBuilder();
  const form = fb.group(
    {
      yearNumber: [{ value: calendarYear.yearNumber, disabled: true }],
      monthActivityStart: [
        calendarYear.monthActivityStart,
        Validators.required,
      ],
      monthActivityEnd: [calendarYear.monthActivityEnd, Validators.required],
    },
    { validators: [compareMonths] }
  );
  return form;
}
