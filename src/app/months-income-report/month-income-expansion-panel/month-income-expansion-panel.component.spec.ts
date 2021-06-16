import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthIncomeExpansionPanelComponent } from './month-income-expansion-panel.component';

xdescribe('MonthIncomeExpansionPanelComponent', () => {
  let component: MonthIncomeExpansionPanelComponent;
  let fixture: ComponentFixture<MonthIncomeExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthIncomeExpansionPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthIncomeExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
