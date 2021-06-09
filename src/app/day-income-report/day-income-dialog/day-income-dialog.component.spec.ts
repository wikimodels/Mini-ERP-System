import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayIncomeDialogComponent } from './day-income-dialog.component';

xdescribe('DayIncomeDialogComponent', () => {
  let component: DayIncomeDialogComponent;
  let fixture: ComponentFixture<DayIncomeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayIncomeDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayIncomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
