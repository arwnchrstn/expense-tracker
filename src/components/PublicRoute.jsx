import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = useSelector((state) => state.user);

  return !user?.username ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
