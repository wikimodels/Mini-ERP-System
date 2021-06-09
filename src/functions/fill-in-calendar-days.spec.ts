import { fillInCalendarDays } from './fill-in-calendar-days';

describe('Fill In Calendar Days', () => {
  it('should correct number of days for january (31)', () => {
    const obj = fillInCalendarDays(1, 2021);

    expect(obj.length).toEqual(31);
    expect(obj[0].dayNameLong).toEqual('пятница');
    expect(obj[0].dayNameShort).toEqual('пт');
    expect(obj[0].dayNumber).toEqual(1);
    expect(obj[0].monthNumber).toEqual(1);
    expect(obj[0].dayNumberStr).toEqual('01');
    expect(obj[0].dayOfWeek).toEqual(5);
    expect(obj[0].dayActivityType).toEqual('неопределённый');
    expect(obj[0].dayCSS).toEqual('day-current');
    expect(obj.length).toEqual(31);
  });
});
