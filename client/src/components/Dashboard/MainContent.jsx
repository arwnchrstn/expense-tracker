import { useState } from "react";

import { useSelector } from "react-redux";

import PieChartCashflow from "./PieChartCashflow";
import PieChartIncome from "./PieChartIncome";
import PieChartExpense from "./PieChartExpense";
import Transactions from "./Transactions";

const MainContent = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const account = useSelector((state) => state.account);

  return (
    <div className="main-content">
      <div className="container bg-light shadow rounded p-3 pb-5 pb-md-3 mb-0 mb-md-5">
        <ul className="nav nav-pills justify-content-center">
          <li
            className="nav-item"
            onClick={() => activeTab !== "overview" && setActiveTab("overview")}
          >
            <span
              className={`nav-link ${activeTab === "overview" && "active"}`}
              aria-current="page"
            >
              Overview
            </span>
          </li>

          <li
            className="nav-item"
            onClick={() =>
              activeTab !== "transaction" && setActiveTab("transaction")
            }
          >
            <span
              className={`nav-link ${activeTab === "transaction" && "active"}`}
            >
              Transactions
            </span>
          </li>
        </ul>

        {activeTab === "overview" &&
          (account?.transactions.length !== 0 ? (
            <div className="row mt-4 justify-content-center">
              <div className="col-md-6 col-lg-4 my-2">
                <PieChartCashflow />
              </div>
              <div className="col-md-6 col-lg-4 my-2">
                <PieChartIncome />
              </div>
              <div className="col-md-6 col-lg-4 my-2">
                <PieChartExpense />
              </div>
            </div>
          ) : (
            <h5 className="text-center text-theme-green mt-4 mb-3">
              No data to display
            </h5>
          ))}

        {activeTab === "transaction" && (
          <div className="row mt-4 justify-content-center">
            <div className="col-12">
              <Transactions />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
