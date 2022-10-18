import { useState } from "react";

import { useSelector } from "react-redux";
import moment from "moment";

const Transactions = () => {
  const [transactionsCount, setTransactionsCount] = useState(10);
  const account = useSelector((state) => state.account);
  const [filter, setFilter] = useState("all");
  const transactionSlice = account.transactions.slice(0, transactionsCount);

  return (
    <>
      <label htmlFor="filter" className="me-2">
        Filter transactions:{" "}
      </label>
      <select
        name="filter"
        id="filter"
        className="form-select w-auto d-inline-block mb-4"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Time</option>
        <option value="daily">This Day</option>
        <option value="weekly">Last 7 Days</option>
        <option value="monthly">This Month</option>
        <option value="yearly">This Year</option>
      </select>

      {transactionSlice.map((transaction) => (
        <div
          className={`p-3 rounded bg-opacity-25 mb-3 border-start border-4 ${
            transaction.type === "expense"
              ? "border-danger bg-danger"
              : "border-success bg-success"
          }`}
        >
          <h6
            className={`fw-bold m-0 text-capitalize ${
              transaction.type === "expense" ? "text-danger " : "text-success "
            }`}
          >
            {transaction.type}
          </h6>
          <h5 className="mb-2 text-capitalize">{transaction.category}</h5>
          <h6
            className={`m-0 fw-bold ${
              transaction.type === "expense" ? "text-danger" : "text-success"
            }`}
          >
            {" "}
            {transaction.type === "expense" ? "-" : "+"}
            {transaction.amount}
          </h6>
          <p className="m-0 fst-italic mt-3">
            {moment(new Date(transaction.dateCreated)).format(
              "MMMM D, YYYY h:mm:ss A"
            )}
          </p>
        </div>
      ))}

      {transactionSlice.length !== account.transactions.length && (
        <button
          className="btn btn-success d-block mx-auto"
          onClick={() => setTransactionsCount((prevCount) => prevCount + 10)}
        >
          Load more
        </button>
      )}
    </>
  );
};

export default Transactions;
