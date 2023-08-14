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
  const [errors, setErrors] = useState({ text: [] });

  const dispatch = useDispatch();
  const current = new Date();
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
    if (formValidation) {
      dispatch(toggleFormValidation());
    }
  }, [purpose, amount, selectedCurrency]);

  const addIncomes = (e) => {
    e.preventDefault();
    if (formValidate()) {
      dispatch(
        addIncome({
          amount: amount,
          purpose: purpose,
          id: Math.floor(Math.random() * 1000000000),
          currency: selectedCurrency.key,
          date: current,
        })
      );
      setAmount("");
      setPurpose("");
    } else if (!formValidation) {
      dispatch(toggleFormValidation);
    }
    settingsErrors();
  };

  const settingsErrors = () => {
    let text = [];
    if (amount.length === 0) {
      text.push("please choose label");
    }
    if (purpose.length === 0) {
      text.push("please choose amount");
    }
    if (Object.keys(selectedCurrency).length === 0) {
      text.push("please choose currency");
    }
    setErrors({
      ...errors,
      text: [...text],
    });
  };
  const addExpenses = (e) => {
    e.preventDefault();
    if (formValidate()) {
      setErrors({});
      dispatch(
        addExpense({
          amount: amount,
          purpose: purpose,
          id: Math.floor(Math.random() * 1000000000),
          currency: selectedCurrency.key,
          date: current,
        })
      );
      setAmount("");
      setPurpose("");
      return;
    } else if (!formValidation) {
      dispatch(toggleFormValidation);
    }
    settingsErrors();
  };
  return (
    <>
      <h3>
        <form>
          <div className="form-control">
            {errors?.text ? (
              errors.text?.map((e) => {
                return (
                  <div className="error-line">
                    <span>
                      {e} <br />
                    </span>
                  </div>
                );
              })
            ) : (
              <></>
            )}
            <label htmlFor="text">Label</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter expense/income label"
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
