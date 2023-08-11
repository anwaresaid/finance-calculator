import React from "react";
import { useSelector } from "react-redux";
import Transaction from "./Transaction";

function TransactionList() {
  const transactions = useSelector((state) => state.reducer.transactions);
  console.log(transactions);
  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions?.map((transaction) => {
          return <Transaction transaction={transaction} key={transaction.id} />;
        })}
      </ul>
    </>
  );
}

export default TransactionList;
