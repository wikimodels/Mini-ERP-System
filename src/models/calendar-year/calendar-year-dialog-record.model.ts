import { CalendarYear } from './calendar-year.model';

export interface CalendarYearDialogRecord {
  title: string;
  calendarYear: CalendarYear;
  actionType: string;
  leftButtonText: string;
  rightButtonText: string;
}
