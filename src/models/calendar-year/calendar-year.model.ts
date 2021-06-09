import { CalendarMonth } from './calendar-month.model';

export interface CalendarYear {
  id?: string;
  email: string;
  monthActivityStart: number;
  monthActivityEnd: number;
  markedForDeletion: boolean;
  yearNumber: number;
  calendarMonths: CalendarMonth[];
}
