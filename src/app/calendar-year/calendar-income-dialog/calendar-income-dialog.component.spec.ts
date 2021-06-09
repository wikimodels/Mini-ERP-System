import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarIncomeDialogComponent } from './calendar-income-dialog.component';

describe('CalendarIncomeDialogComponent', () => {
  let component: CalendarIncomeDialogComponent;
  let fixture: ComponentFixture<CalendarIncomeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarIncomeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarIncomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
