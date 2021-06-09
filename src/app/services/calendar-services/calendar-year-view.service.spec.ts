import { TestBed } from '@angular/core/testing';

import { CalendarYearViewService } from './calendar-year-view.service';

describe('CalendarYearViewService', () => {
  let service: CalendarYearViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarYearViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
