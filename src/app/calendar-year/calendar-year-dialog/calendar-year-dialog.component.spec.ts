import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingYearsDialogComponent } from './calendar-year-dialog.component';

describe('WorkingYearsDialogComponent', () => {
  let component: WorkingYearsDialogComponent;
  let fixture: ComponentFixture<WorkingYearsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkingYearsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingYearsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
