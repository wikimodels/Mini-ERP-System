import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTypesComponent } from './income-types.component';

xdescribe('IncomeTypesComponent', () => {
  let component: IncomeTypesComponent;
  let fixture: ComponentFixture<IncomeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeTypesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
