import { CalendarYear } from '../calendar-year/calendar-year.model';

export interface CalendarYearsArchiveDialogData {
  title: string;
  calendarYear: CalendarYear;
  actionType: string;
  leftButtonText: string;
  rightButtonText: string;
}
