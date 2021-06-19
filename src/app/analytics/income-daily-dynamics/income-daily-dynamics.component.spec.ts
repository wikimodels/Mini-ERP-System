import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDailyDynamicsComponent } from './income-daily-dynamics.component';

describe('IncomeDynamicsComponent', () => {
  let component: IncomeDailyDynamicsComponent;
  let fixture: ComponentFixture<IncomeDailyDynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeDailyDynamicsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeDailyDynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
