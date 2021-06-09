import { TestBed } from '@angular/core/testing';

import { CalendarYearService } from './calendar-year.service';

describe('CalendarYearService', () => {
  let service: CalendarYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
