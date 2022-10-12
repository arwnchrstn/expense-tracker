import { useDispatch } from "react-redux";

import { removeUser } from "../redux/features/userSlice";
import { removeAccessToken } from "../redux/features/authSlice";
import { removeAccountInfo } from "../redux/features/accountSlice";

const useClearAllState = () => {
  const dispatch = useDispatch();

  return () => {
    //clear all state inside redux
    dispatch(removeUser());
    dispatch(removeAccessToken());
    dispatch(removeAccountInfo());
  };
};

export default useClearAllState;
