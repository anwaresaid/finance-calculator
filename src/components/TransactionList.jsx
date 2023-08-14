import React, { useState } from "react";
import { useSelector } from "react-redux";
import Transaction from "./Transaction";
import Dropdown from "react-bootstrap/Dropdown";

function TransactionList() {
  const filterOptions = [
    { label: "income", value: 0 },
    { label: "expense", value: 1 },
    { label: "none", value: 2 },
  ];
  const transactions = useSelector((state) => state.reducer.transactions);
  const [selectedFilter, setSelectedFilter] = useState(
    filterOptions.find((item) => item.lable === "none")
  );

  const onselect = (option) => {
    setSelectedFilter(option);
  };
  return (
    <>
      <h3>History</h3>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedFilter?.label || "please select"}
        </Dropdown.Toggle>
        <Dropdown.Menu className="scrollable-dropdown-menu">
          {filterOptions.map((option) => {
            return (
              <Dropdown.Item
                key={option.value}
                value={option.value}
                onClick={() => onselect(option)}
              >
                {option.label}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <ul id="list" className="list">
        {selectedFilter?.value === 2 || selectedFilter === undefined
          ? transactions?.map((transaction) => {
              return (
                <Transaction transaction={transaction} key={transaction.id} />
              );
            })
          : selectedFilter?.value === 1
          ? transactions
              .filter((item) => item.amount < 0)
              .map((transaction) => {
                return (
                  <Transaction transaction={transaction} key={transaction.id} />
                );
              })
          : transactions
              .filter((item) => item.amount > 0)
              .map((transaction) => {
                return (
                  <Transaction transaction={transaction} key={transaction.id} />
                );
              })}
      </ul>
    </>
  );
}

export default TransactionList;
