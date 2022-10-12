import * as yup from "yup";

export const addTransactionSchema = yup.object().shape({
  type: yup.string().required("Please select a transaction type"),
  category: yup.string().required("Please select a category type"),
  amount: yup
    .number()
    .min(1, "Amount cannot be less than or equal to 0")
    .max(1000000000000000, "Amount cannot be greater than 1000000000000000")
    .required("Amount is required")
});
