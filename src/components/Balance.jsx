import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { setSelectedCurrency, fetchExchangeRate } from "../store/Actions";

function Balance() {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.reducer.transactions);
  const currencies = useSelector((state) => state.reducer.currencies);
  const selectedCurrency = useSelector(
    (state) => state.reducer.selectedCurrency
  );
  const baseCurrency = useSelector((state) => state.reducer.baseCurrency);
  const selectedCurrencyRate = useSelector(
    (state) => state.reducer.selectedCurrencyRate
  );

  const allValues = transactions.map((transaction) => transaction.amount);
  const sum =
    allValues.reduce((a, b) => a + b, 0).toFixed(2) * selectedCurrencyRate;
  const [operator, setOperator] = useState("");
  useEffect(() => {
    assignOperator();
    if (baseCurrency.key && selectedCurrency.key)
      dispatch(fetchExchangeRate(baseCurrency.key, selectedCurrency.key));
    console.log("currencies", currencies);
    console.log("exchange rate", selectedCurrencyRate);
  }, [selectedCurrency, currencies]);

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
        <DropdownButton id="dropdown-basic-button" title={selectedCurrency.key}>
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
        </DropdownButton>
      </div>
    </>
  );
}

export default Balance;
