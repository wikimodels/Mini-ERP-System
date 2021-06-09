export function addLeadingZero(num: number): string {
  const places = 2;
  if (num < 10 && num > 0) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }
  if (num >= 10) {
    return num.toString();
  }
  throw new Error('number must be postive');
}
