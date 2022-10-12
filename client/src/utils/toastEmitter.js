import { toast } from "react-toastify";

/**
 * Display error toast
 * @param message Error message to be displayed
 */
export const errorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });
};
