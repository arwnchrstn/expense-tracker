import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "../utils/axios";
import { setAccessToken } from "../redux/features/authSlice";
import useClearAllState from "./useClearAllState";
import errorHandler from "../utils/errorHandler";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const clearAllState = useClearAllState();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_REFRESH_API);

      dispatch(setAccessToken(response.data));
      return response.data;
    } catch (error) {
      //handle error
      if (error.response.status === 401) {
        clearAllState();
        navigate("/");
      } else {
        errorHandler(error);
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
