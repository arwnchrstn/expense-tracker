import { useState } from "react";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("daily");

  return (
    <>
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === "daily" && "active"}`}
            onClick={() => activeTab !== "daily" && setActiveTab("daily")}
            aria-current="page"
          >
            Daily
          </span>
        </li>

        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === "weekly" && "active"}`}
            onClick={() => activeTab !== "weekly" && setActiveTab("weekly")}
          >
            Weekly
          </span>
        </li>

        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === "monthly" && "active"}`}
            onClick={() => activeTab !== "monthly" && setActiveTab("monthly")}
          >
            Monthly
          </span>
        </li>

        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === "yearly" && "active"}`}
            onClick={() => activeTab !== "yearly" && setActiveTab("yearly")}
          >
            Yearly
          </span>
        </li>
      </ul>
    </>
  );
};

export default Transactions;
