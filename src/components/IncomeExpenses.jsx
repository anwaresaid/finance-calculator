import { useSelector } from "react-redux";

function IncomeExpenses() {
  const transactions = useSelector((state) => state.reducer.transactions);
  const currencies = useSelector((state) => state.reducer.currencies);
  const baseCurrency = useSelector((state) => state.reducer.baseCurrency);
  const selectedCurrency = useSelector(
    (state) => state.reducer.selectedCurrency
  );

  const income = transactions
    ?.filter((transaction) => transaction.amount > 0)
    ?.reduce(
      (accum, current) =>
        accum +
        current.amount *
          (baseCurrency.value
            ? selectedCurrency.value /
              currencies.find((item) => item.key === current.currency).value
            : 1),
      0
    )
    ?.toFixed(2);
  const expense = transactions
    ?.filter((transaction) => transaction.amount < 0)
    ?.reduce(
      (accum, current) =>
        accum +
        current.amount *
          (baseCurrency.value
            ? selectedCurrency.value /
              currencies.find((item) => item.key === current.currency).value
            : 1),
      0
    )
    ?.toFixed(2);
  const signExpense = expense !== 0.0 && expense !== "0.00" ? "-" : "";
  const signIncome = income !== 0.0 && income !== "0.00" ? "+" : "";
  return (
    <>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="mony-plus" className="money plus">
            {selectedCurrency.key}
            {" " + Math.abs(income)}
            {" " + signIncome}
          </p>
        </div>
        <div>
          <h4>Expenses</h4>
          <p id="mony-minus" className="money minus">
            {selectedCurrency.key}
            {" " + Math.abs(expense)}
            {" " + signExpense}
          </p>
        </div>
      </div>
    </>
  );
}

export default IncomeExpenses;
