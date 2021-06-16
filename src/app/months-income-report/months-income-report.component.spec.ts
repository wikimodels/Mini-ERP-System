import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsIncomeReportComponent } from './months-income-report.component';

xdescribe('MonthsIncomeReportComponent', () => {
  let component: MonthsIncomeReportComponent;
  let fixture: ComponentFixture<MonthsIncomeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthsIncomeReportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsIncomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
