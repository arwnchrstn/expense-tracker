import { errorToast } from "./toastEmitter";

const errorHandler = (error) => {
  errorToast(
    error.response.data.message ||
      error.response.data ||
      error.response.status + error.response.statusText
  );
  console.error(
    error.response.data.message ||
      error.response.data ||
      error.response.status + error.response.statusText
  );
};

export default errorHandler;
