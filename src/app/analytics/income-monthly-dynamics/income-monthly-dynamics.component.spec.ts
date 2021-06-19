import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeMonthlyDynamicsComponent } from './income-monthly-dynamics.component';

describe('IncomeMonthlyDynamicsComponent', () => {
  let component: IncomeMonthlyDynamicsComponent;
  let fixture: ComponentFixture<IncomeMonthlyDynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeMonthlyDynamicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeMonthlyDynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
