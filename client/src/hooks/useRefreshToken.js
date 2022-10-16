import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setAccessToken } from "../redux/features/authSlice";
import axiosDefault from "../utils/axios";
import useClearAllState from "./useClearAllState";
import errorHandler from "../utils/errorHandler";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const clearAllState = useClearAllState();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axiosDefault.get(
        process.env.REACT_APP_REFRESH_USER_API
      );

      dispatch(setAccessToken(response.data));
      return response.data;
    } catch (error) {
      //handle error
      if (error.response.status === 401) {
        clearAllState();
        navigate("/");
      } else {
        toast.dismiss();
        errorHandler(error);
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
