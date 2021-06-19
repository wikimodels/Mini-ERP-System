import { CalendarYearsArchiveDialogData } from 'src/models/calendar-years-archive/calendar-years-archive-dialog-data.model';

export function getCalendarYearsArchiveCreateDialogData(): CalendarYearsArchiveDialogData {
  return {
    title: 'Добавить год',
    calendarYear: undefined,
    actionType: 'create',
    leftButtonText: 'Сохранить',
    rightButtonText: 'Отменить',
  };
}
