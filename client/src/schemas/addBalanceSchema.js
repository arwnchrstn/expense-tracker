import * as yup from "yup";

export const addBalanceSchema = yup.object().shape({
  addBalance: yup
    .number()
    .min(1, "Amount must be greater than 0")
    .max(1000000, "Amount must not exceed 1000000")
    .required("Amount is required")
});
