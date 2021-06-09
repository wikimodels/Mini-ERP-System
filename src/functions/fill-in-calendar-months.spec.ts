import { fillInCalendarMonths } from './fill-in-calendar-months';

xdescribe('Fill In Calendar Months', () => {
  it('should return correct months', () => {
    const obj = fillInCalendarMonths(1, 3, 2021);

    expect(obj.length).toEqual(12);
    expect(obj[0].longMonthName).toEqual('январь');
    expect(obj[0].shortMonthName).toEqual('янв.');
    expect(obj[0].daysInMonth).toEqual(31);
    expect(obj[0].monthNumber).toEqual(1);
    expect(obj[0].monthNumberStr).toEqual('01');
    expect(obj[0].calendarDays.length).toEqual(35);
    expect(obj[1].calendarDays.length).toEqual(28);
  });
});
