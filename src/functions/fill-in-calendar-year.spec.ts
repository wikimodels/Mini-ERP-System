import { CalendarYear } from 'src/models/calendar-year.model';
import { fillInCalendarDays } from './fill-in-calendar-days';
import { fillInCalendarMonths } from './fill-in-calendar-months';

xdescribe('Fill In Calendar Year', () => {
  it('should return correct number of months', () => {
    const year = 2021;
    const obj: CalendarYear = {
      yearNumber: year,
      calendarMonths: fillInCalendarMonths(1, 3, year),
      email: '',
      monthActivityEnd: 1,
      monthActivityStart: 3,
      markedForDeletion: false,
    };

    expect(obj.calendarMonths.length).toEqual(12);
    expect(obj.yearNumber).toEqual(year);
  });
});
