import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function IncomeExpenses() {
  const transactions = useSelector((state) => state.reducer.transactions);
  const exchangeRates = useSelector((state) => state.reducer.exchangeRates);
  const selectedCurrency = useSelector(
    (state) => state.reducer.selectedCurrency
  );

  useEffect(() => {
    console.log("exhange rates---", exchangeRates);
  }, [exchangeRates]);

  const income = transactions
    ?.filter((transaction) => transaction.amount > 0)
    ?.reduce((accum, current) => accum + current.amount, 0)
    ?.toFixed(2);
  const expense = transactions
    ?.filter((transaction) => transaction.amount < 0)
    ?.reduce((accum, current) => accum + current.amount, 0)
    ?.toFixed(2);
  const signExpense = expense !== 0.0 && expense !== "0.00" ? "-" : "";
  const signIncome = income !== 0.0 && income !== "0.00" ? "+" : "";
  return (
    <>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="mony-plus" className="money plus">
            {signIncome + " "}
            {selectedCurrency.key}
            {Math.abs(income)}
          </p>
        </div>
        <div>
          <h4>Expenses</h4>
          <p id="mony-minus" className="money minus">
            {signExpense + " "}
            {selectedCurrency.key}
            {Math.abs(expense)}
          </p>
        </div>
      </div>
    </>
  );
}

export default IncomeExpenses;
