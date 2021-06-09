import { addLeadingZero } from './add-leading-zero';

describe('Add Leading Zero', () => {
  it('should add leading zero to numbers below 10', () => {
    expect(addLeadingZero(1)).toEqual('01');

    expect(addLeadingZero(10)).toEqual('10');

    expect(function () {
      addLeadingZero(-1);
    }).toThrow(new Error('number must be postive'));
  });
});
