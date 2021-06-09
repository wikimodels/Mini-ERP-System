import { FormBuilder, Validators } from '@angular/forms';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

export function getCalendarYearDeleteForm(calendarYear: CalendarYear) {
  const fb = new FormBuilder();
  const form = this.fb.group({
    yearNumber: [{ value: calendarYear.yearNumber, disabled: true }],
    monthActivityStart: [
      {
        value: calendarYear.monthActivityStart,
        disabled: true,
      },
    ],
    monthActivityEnd: [
      {
        value: calendarYear.monthActivityEnd,
        disabled: true,
      },
    ],
  });
  return form;
}
