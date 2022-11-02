import { useDispatch } from "react-redux";

import { setUser } from "../redux/features/userSlice";
import { setAccessToken } from "../redux/features/authSlice";
import { setAccountInfo } from "../redux/features/accountSlice";

const useSetLogin = () => {
  const dispatch = useDispatch();

  return (username, accessToken, balance, transactions) => {
    dispatch(setUser(username));
    dispatch(setAccessToken(accessToken));
    dispatch(setAccountInfo({ balance, transactions }));
  };
};

export default useSetLogin;
