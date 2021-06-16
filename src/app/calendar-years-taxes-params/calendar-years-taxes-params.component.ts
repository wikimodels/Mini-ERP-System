import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCalendarYearsTaxesParamsFormGroup } from 'src/functions/calendar-years-taxes-params/get-calendar-years-taxes-params-form-group';
import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';

import { BasicSnackbarService } from '../basic-snackbar/basic-snackbar.service';
import { MessageType } from '../basic-snackbar/models/message-type';
import { CalendarYearTaxesParamsService } from '../services/calendar-services/calendar-year-taxes-params.service';
import { CalendarYearService } from '../services/core/calendar-year.service';

@Component({
  selector: 'app-calendar-years-taxes-params',
  templateUrl: './calendar-years-taxes-params.component.html',
  styleUrls: ['./calendar-years-taxes-params.component.css'],
})
export class CalendarYearsTaxesParamsComponent implements OnInit, OnDestroy {
  calendarYear: CalendarYear;
  sub: Subscription;
  form: FormGroup;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  hide = true;

  constructor(
    private route: ActivatedRoute,
    private snackbar: BasicSnackbarService,
    private calenarYearTaxesParamService: CalendarYearTaxesParamsService,
    private calendarYearService: CalendarYearService
  ) {}

  ngOnInit(): void {
    const yearId = this.route.snapshot.queryParams['yearId'];

    this.sub = this.calendarYearService
      .calendarYearById$(yearId)
      .subscribe((value) => {
        console.log('value', value);
        console.log(value);
        this.calendarYear = value;
        this.form = getCalendarYearsTaxesParamsFormGroup(this.calendarYear);
        console.log(this.form);
      });
  }
  calendarMonths(): FormArray {
    return this.form.get('calendarMonths') as FormArray;
  }
  onSubmit() {
    if (this.form.status === 'VALID') {
      const calendarMonths = this.form.getRawValue().calendarMonths;
      this.calenarYearTaxesParamService
        .updateYearSettings(calendarMonths, this.calendarYear)
        .subscribe(
          () => {
            this.snackbar.open('Запись успешно обновлена', MessageType.INFO);
          },
          (err) => {
            this.snackbar.open(
              'Упппссс.. Произошла ошибка!',
              MessageType.WARNING
            );
          }
        );
    }
  }

  closeAccordion() {
    this.accordion.closeAll();
    this.hide = !this.hide;
  }

  openAccordion() {
    this.accordion.openAll();
    this.hide = !this.hide;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
