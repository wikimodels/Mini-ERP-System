import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';
import { AuthService } from 'src/app/services/shared/auth.service';
import { compareMonths } from '../validators/compare-month';
import { YearAsyncValidator } from '../validators/year-async-validator';

export function getCalendarYearCreateDialogForm() {
  const fb = new FormBuilder();
  const service = new CalendarYearService(
    new AuthService(),
    new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }))
  );
  const form = fb.group(
    {
      yearNumber: [
        '',
        Validators.compose([Validators.required]),
        Validators.composeAsync([YearAsyncValidator.createValidator(service)]),
      ],
      monthActivityStart: ['', Validators.required],
      monthActivityEnd: ['', Validators.required],
    },
    { validators: [compareMonths] }
  );
  return form;
}
