export function getIncomeTypeIndex(
  dayIncome: DayIncome,
  incomeTypes: IncomeType[]
) {
  const incomeTypeIndex = incomeTypes.findIndex(
    (t) => t.typeName == dayIncome.incomeTypeName
  );
  return incomeTypeIndex;
}
