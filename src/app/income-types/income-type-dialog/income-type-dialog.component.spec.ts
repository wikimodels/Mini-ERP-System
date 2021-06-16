import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTypeDialogComponent } from './income-type-dialog.component';

describe('IncomeTypeDialogComponent', () => {
  let component: IncomeTypeDialogComponent;
  let fixture: ComponentFixture<IncomeTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
