import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import getSymbolFromCurrency from "currency-symbol-map";

import AddTransaction from "./AddTransaction";
import AddBalance from "./AddBalance";
import DeleteAccount from "./DeleteAccount";
import useClearAllState from "../../hooks/useClearAllState";
import axiosDefault from "../../utils/axios";

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [pwaSupport, setPwaSupport] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(
    localStorage.getItem("currency") || "PHP"
  );
  const account = useSelector((state) => state.account);
  const user = useSelector((state) => state.user);
  const clearAllState = useClearAllState();
  const navigate = useNavigate();

  //Trigger install prompt
  const handleInstall = (evt) => {
    evt.preventDefault();
    if (!installPrompt.promptInstall) {
      return;
    }
    installPrompt.prompt();
  };

  //handle change in currency
  const changeCurrency = (e) => {
    if (e.target.value === currencySymbol) return;

    setCurrencySymbol(e.target.value);
    localStorage.setItem("currency", e.target.value);
  };

  //handle logout
  const logout = async () => {
    await axiosDefault.get(process.env.REACT_APP_LOGOUT_API);
    clearAllState();
    localStorage.clear("currency");
    navigate("/");
  };

  useEffect(() => {
    const handler = async (e) => {
      e.preventDefault();
      setPwaSupport(true);
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  useEffect(() => {
    if (sidebarVisible) document.body.classList.add("disable-scroll");
    else document.body.classList.remove("disable-scroll");
  }, [sidebarVisible]);

  return (
    <div className="header bg-theme-green text-white shadow px-3 pt-4 pb-5">
      <div className="container text-center">
        <div
          className={`sidebar-backdrop ${sidebarVisible ? "active" : ""}`}
        ></div>
        <div
          className={`sidebar shadow d-flex flex-column p-4 ${
            sidebarVisible ? "active" : ""
          }`}
        >
          <AiOutlineClose
            size={30}
            className="text-theme-green align-self-end mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />

          <h5 className="text-theme-green">Hi, {user?.username}!</h5>

          {pwaSupport && (
            <button
              className="btn btn-outline-success btn-sm rounded-pill my-2 px-4"
              onClick={handleInstall}
            >
              Install App
            </button>
          )}
          <button
            className="btn btn-outline-success btn-sm rounded-pill my-2 px-4"
            onClick={() => setShowDeleteAccount(true)}
          >
            Delete Account
          </button>
          <button
            className="btn btn-outline-success btn-sm rounded-pill my-2 px-4"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>

        <AiOutlineMenu
          size={30}
          className="mb-2 d-block"
          style={{ cursor: "pointer" }}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        />

        <select
          className="form-select form-select-sm w-auto mx-auto mb-2"
          value={currencySymbol}
          onChange={changeCurrency}
        >
          <option value="PHP">PHP</option>
          <option value="USD">USD</option>
        </select>
        <h4 className="m-0">Account Balance:</h4>
        <p className="m-0 fs-2 fw-bold">
          {getSymbolFromCurrency(currencySymbol)} {account?.balance?.toFixed(2)}
        </p>

        <button
          className="btn btn-outline-light btn-sm rounded-pill px-4 m-1"
          onClick={() => setShowAddTransaction(true)}
        >
          Add Transaction
        </button>
        <button
          className="btn btn-outline-light btn-sm rounded-pill px-4 m-1"
          onClick={() => setShowAddBalance(true)}
        >
          Add Balance
        </button>

        <AddTransaction
          showAddTransaction={showAddTransaction}
          setShowAddTransaction={setShowAddTransaction}
        />
        <AddBalance
          showAddBalance={showAddBalance}
          setShowAddBalance={setShowAddBalance}
        />
        <DeleteAccount
          showDeleteAccount={showDeleteAccount}
          setShowDeleteAccount={setShowDeleteAccount}
        />
      </div>
    </div>
  );
};

export default Header;
