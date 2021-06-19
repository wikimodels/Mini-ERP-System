import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { CalendarYearsArchiveDialogData } from 'src/models/calendar-years-archive/calendar-years-archive-dialog-data.model';

export function getCalendarYearsArchiveDeleteDialogData(
  calendarYear: CalendarYear
): CalendarYearsArchiveDialogData {
  return {
    title: 'Удалить данный год?',
    calendarYear: calendarYear,
    actionType: 'delete',
    leftButtonText: 'Удалить',
    rightButtonText: 'Отменить',
  };
}
