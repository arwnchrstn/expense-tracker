import * as yup from "yup";

export const deleteAccountSchema = yup.object().shape({
  confirmation: yup
    .string()
    .oneOf(["/delete my account"], "Please type /delete my account to proceed")
    .required("Please type /delete my account to proceed"),
  confirmPassword: yup.string().required("Please type your password")
});
