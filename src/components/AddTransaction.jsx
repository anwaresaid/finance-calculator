import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, addExpense, toggleFormValidation } from "../store/Actions";

function AddTransaction() {
  const selectedCurrency = useSelector(
    (state) => state.reducer.selectedCurrency
  );
  const formValidation = useSelector((state) => state.reducer.formValidation);

  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  const dispatch = useDispatch();

  const formValidate = () => {
    if (
      amount.length === 0 ||
      purpose.length === 0 ||
      Object.keys(selectedCurrency).length === 0
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log("form", formValidate());
    if (formValidation) {
      dispatch(toggleFormValidation());
    }
  }, [purpose, amount, selectedCurrency]);

  const addIncomes = (e) => {
    console.log(formValidate());
    console.log(purpose.length === 0);
    console.log(selectedCurrency.length === 0);
    e.preventDefault();
    if (formValidate()) {
      dispatch(
        addIncome({
          amount: amount,
          purpose: purpose,
          id: Math.floor(Math.random() * 1000000000),
          currency: selectedCurrency.key,
        })
      );
      setAmount("");
      setPurpose("");
    } else if (!formValidation) {
      dispatch(toggleFormValidation);
    }
  };
  const addExpenses = (e) => {
    e.preventDefault();
    if (formValidate()) {
      dispatch(
        addExpense({
          amount: amount,
          purpose: purpose,
          id: Math.floor(Math.random() * 1000000000),
          currency: selectedCurrency.key,
        })
      );
      setAmount("");
      setPurpose("");
    } else if (!formValidation) {
      dispatch(toggleFormValidation);
    }
  };
  return (
    <>
      <h3>
        <form>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter text"
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value * 1)}
              placeholder="Enter amount"
            />
          </div>
          <div className="adding-container">
            <button type="submit" className="btn income" onClick={addIncomes}>
              Add Income
            </button>
            <button type="submit" className="btn expense" onClick={addExpenses}>
              Add Expense
            </button>
          </div>
        </form>
      </h3>
    </>
  );
}

export default AddTransaction;
