import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCalendarYearComponent } from './no-calendar-year.component';

describe('NoCalendarYearComponent', () => {
  let component: NoCalendarYearComponent;
  let fixture: ComponentFixture<NoCalendarYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoCalendarYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCalendarYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
