export function getTaxValue(income: number, taxRate: number) {
  const taxSum = (income / 100) * taxRate;
  const decimalPresicion = 2;
  const p = Math.pow(10, decimalPresicion);
  const m = taxSum * p * (1 + Number.EPSILON);

  return Math.round(m) / p;
}
