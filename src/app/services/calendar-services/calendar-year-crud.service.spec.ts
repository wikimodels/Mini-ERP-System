import { TestBed } from '@angular/core/testing';

import { CalendarYearCrudService } from './calendar-year-crud.service';

describe('CalendarYearCrudService', () => {
  let service: CalendarYearCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarYearCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
