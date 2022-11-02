import * as yup from "yup";

const USERNAME_VALIDATOR = /^[a-z0-9]([._-](?![._-])|[a-z0-9]){3,18}[a-z0-9]$/;
const PASSWORD_VALIDATOR =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const PASSWORD_ERROR_MESSAGE =
  "Password must be 8 to 32 characters containing one lowercase letter, one uppercase letter, one number, and one special character";

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at maximum of 30 characters only")
    .matches(
      USERNAME_VALIDATOR,
      "Username must only contain lowercase letters, numbers, and underscore. No underscore at the beginning and ending of the username."
    )
    .required("Username is required"),
  password: yup
    .string()
    .min(8, PASSWORD_ERROR_MESSAGE)
    .max(32, PASSWORD_ERROR_MESSAGE)
    .matches(PASSWORD_VALIDATOR, {
      message: PASSWORD_ERROR_MESSAGE
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Password does not match")
});
