import { errorToast } from "./toastEmitter";

const errorHandler = (error) => {
  errorToast(
    error?.response?.data?.message ||
      error?.message ||
      error?.response?.status + " " + error?.response?.statusText ||
      "Unknown error occurred"
  );
  console.error(
    error?.response?.data?.message ||
      error?.message ||
      error?.response?.status + " " + error?.response?.statusText ||
      "Unknown error occurred"
  );
};

export default errorHandler;
