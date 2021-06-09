import { TestBed } from '@angular/core/testing';

import { CalendarDayIncomeService } from './calendar-day-income.service';

describe('CalendarDayIncomeService', () => {
  let service: CalendarDayIncomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDayIncomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
