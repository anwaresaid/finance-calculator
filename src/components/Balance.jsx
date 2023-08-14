import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { setSelectedCurrency } from "../store/Actions";

function Balance() {
  const dispatch = useDispatch();

  const [sum, setSum] = useState(0);

  const transactions = useSelector((state) => state.reducer.transactions);
  const currencies = useSelector((state) => state.reducer.currencies);
  const selectedCurrency = useSelector(
    (state) => state.reducer.selectedCurrency
  );
  const baseCurrency = useSelector((state) => state.reducer.baseCurrency);
  const exchangedSum = useSelector((state) => state.reducer.exchangedSum);
  const allValues = transactions.map((transaction) => {
    return { amount: transaction.amount, currency: transaction.currency };
  });
  const [operator, setOperator] = useState("");
  useEffect(() => {
    assignOperator();
  }, [selectedCurrency, currencies]);

  useEffect(() => {
    setSum(
      allValues
        .reduce(
          (a, b) =>
            a +
            b.amount *
              (baseCurrency.value
                ? selectedCurrency.value /
                  currencies.find((item) => item.key === b.currency).value
                : 1),
          0
        )
        .toFixed(2)
    );
  }, [JSON.stringify(allValues), selectedCurrency]);

  useEffect(() => {
    if (exchangedSum !== 0) {
      setSum(exchangedSum);
    }
  }, [selectedCurrency, exchangedSum]);

  const assignOperator = () => {
    setOperator(sum < 0 ? "-" : "");
  };
  const onselect = (e) => {
    dispatch(setSelectedCurrency(e));
  };
  return (
    <>
      <div className="title-container">
        <div>
          <h4>Balance</h4>
          <h1 id="balance">
            {operator}${Math.abs(sum)}
          </h1>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedCurrency.key}
          </Dropdown.Toggle>
          <Dropdown.Menu className="scrollable-dropdown-menu">
            {currencies.map((currency) => {
              return (
                <Dropdown.Item
                  key={currency.key}
                  value={currency.value}
                  onClick={() => onselect(currency)}
                >
                  {currency.key}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default Balance;
