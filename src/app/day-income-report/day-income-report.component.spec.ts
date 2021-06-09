import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayIncomeReportComponent } from './day-income-report.component';

xdescribe('DayIncomeReportComponent', () => {
  let component: DayIncomeReportComponent;
  let fixture: ComponentFixture<DayIncomeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayIncomeReportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayIncomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
