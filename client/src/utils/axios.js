import axios from "axios";

/**
 * Default axios instance
 */
const axiosDefault = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});
export default axiosDefault;

/**
 * Axios private instance
 */
export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
