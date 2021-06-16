import { TestBed } from '@angular/core/testing';

import { CalendarYearTaxesParamsService } from './calendar-year-taxes-params.service';

describe('CalendarYearTaxesParamsService', () => {
  let service: CalendarYearTaxesParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarYearTaxesParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
