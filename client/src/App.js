import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useQuery } from "react-query";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useSetSession from "./hooks/useSetSession";
import { loader } from "./config/loader";
import axios from "./utils/axios";

const Dashboard = lazy(() => import("./components/Dashboard"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

function App() {
  //get persistent user data using react query based on cookie
  const getUserOnRefresh = () => {
    return axios.get(process.env.REACT_APP_REFRESH_USER_API);
  };
  const {
    isLoading,
    isFetching,
    data: user
  } = useQuery("persistent-user", getUserOnRefresh);
  const setSession = useSetSession();

  if (isLoading || isFetching) {
    return loader;
  } else {
    if (user.data)
      setSession(
        user.data.username,
        user.data.accessToken,
        user.data.balance,
        user.data.transactions
      );
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Expense Tracker</title>
        </Helmet>
      </HelmetProvider>

      <Suspense fallback={loader}>
        <Routes>
          {/* private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          {/* public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
