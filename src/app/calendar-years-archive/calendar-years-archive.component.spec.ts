import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingYearsComponent } from './calendar-years-archive.component';

xdescribe('WorkingYearsComponent', () => {
  let component: WorkingYearsComponent;
  let fixture: ComponentFixture<WorkingYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkingYearsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
