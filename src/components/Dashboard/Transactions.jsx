import { useMemo, useState } from "react";

import { useSelector } from "react-redux";
import moment from "moment";

const Transactions = () => {
  const DATE_FORMAT = "MMMM D, YYYY h:mm:ss A";
  const [transactionsCount, setTransactionsCount] = useState(10);
  const account = useSelector((state) => state.account);
  const [filter, setFilter] = useState(localStorage.getItem("filter") || "all");
  const transactionSlice = useMemo(() => {
    const lastSevenDays = new Date(
      moment().subtract(7, "days").format(DATE_FORMAT)
    ).getTime();

    return account.transactions
      .filter((transaction) => {
        if (filter === "all") return transaction;
        else if (
          filter === "daily" &&
          moment(new Date(transaction.dateCreated))
            .format("MMMM D YYYY")
            .includes(moment(new Date()).format("MMMM D YYYY"))
        )
          return transaction;
        else if (
          filter === "weekly" &&
          new Date(transaction.dateCreated) >= lastSevenDays &&
          new Date(transaction.dateCreated).getTime() <= new Date().getTime()
        )
          return transaction;
        else if (
          filter === "monthly" &&
          moment(new Date(transaction.dateCreated))
            .format("MMMM")
            .includes(moment(new Date()).format("MMMM"))
        )
          return transaction;
        else if (
          filter === "yearly" &&
          moment(new Date(transaction.dateCreated))
            .format("YYYY")
            .includes(moment(new Date()).format("YYYY"))
        )
          return transaction;
      })
      .slice(0, transactionsCount);
  }, [filter, transactionsCount, account.transactions]);

  //handle change on transaction filter
  const changeFilter = (e) => {
    setFilter(e.target.value);
    localStorage.setItem("filter", e.target.value);
  };

  return (
    <>
      <label htmlFor="filter" className="me-2">
        Filter transactions:{" "}
      </label>
      <select
        name="filter"
        id="filter"
        className="form-select w-auto d-inline-block mb-4"
        onChange={changeFilter}
        value={filter}
      >
        <option value="all">All Time</option>
        <option value="daily">This Day</option>
        <option value="weekly">Last 7 Days</option>
        <option value="monthly">This Month</option>
        <option value="yearly">This Year</option>
      </select>

      {transactionSlice.length === 0 && (
        <h5 className="text-center">No transactions to show</h5>
      )}

      {transactionSlice.map((transaction) => (
        <div
          className={`p-3 rounded bg-opacity-25 mb-3 border-start border-4 ${
            transaction.type === "expense"
              ? "border-danger bg-danger"
              : "border-success bg-success"
          }`}
          key={transaction._id}
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
            {moment(new Date(transaction.dateCreated)).format(DATE_FORMAT)}
          </p>
        </div>
      ))}

      {transactionSlice.length >= transactionsCount && (
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
