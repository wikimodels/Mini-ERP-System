import { CalendarYear } from 'src/models/calendar-year/calendar-year.model';
import { CalendarYearsArchiveDialogData } from 'src/models/calendar-years-archive/calendar-years-archive-dialog-data.model';

export function getCalendarYearsArchiveUpdateDialogData(
  calendarYear: CalendarYear
): CalendarYearsArchiveDialogData {
  return {
    title: 'Редактировать год',
    calendarYear: calendarYear,
    actionType: 'update',
    leftButtonText: 'Сохранить',
    rightButtonText: 'Отменить',
  };
}
