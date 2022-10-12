import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.user);

  return user?.username ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
