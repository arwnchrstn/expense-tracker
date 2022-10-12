import { useEffect } from "react";
import { useSelector } from "react-redux";

import { axiosPrivate } from "../utils/axios";
import useRefreshToken from "../hooks/useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    //intercept axios request
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (request) => {
        //set Authorization header if it is not present
        if (!request?.headers["Authorization"]) {
          request.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }

        return request;
      },
      (error) => Promise.reject(error)
    );

    //intercept axios response
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
