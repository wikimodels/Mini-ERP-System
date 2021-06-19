import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPaymentsComponent } from './tax-payments.component';

describe('TaxPaymentsComponent', () => {
  let component: TaxPaymentsComponent;
  let fixture: ComponentFixture<TaxPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
