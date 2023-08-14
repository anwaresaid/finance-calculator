import React from "react";
import { useDispatch } from "react-redux";

function Transaction(props) {
  const { transaction } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({ payload: transaction, type: "DELETE_ITEM" });
  };

  const operator = transaction.amount < 0 ? "-" : "+";

  return (
    <>
      <li className={operator === "-" ? "minus" : "plus"}>
        {transaction.purpose}
        <div>{transaction.date.toUTCString()}</div>
        <span>
          {transaction.currency}
          {" " + Math.abs(transaction.amount)}
          {" " + operator}
        </span>
        <button
          className="delete-btn"
          onClick={() => handleDelete(transaction.id)}
        >
          x
        </button>
      </li>
    </>
  );
}

export default Transaction;
