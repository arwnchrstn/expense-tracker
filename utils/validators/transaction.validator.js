const validator = require("./validator");
const Joi = require("joi");

const transactionSchema = Joi.object({
  type: Joi.string().valid("income", "expense").required().messages({
    "string.empty": "Transaction type is required",
    "any.only": "Transaction type must be income or expense only"
  }),
  category: Joi.string().required().messages({
    "string.empty": "Transaction category is required"
  }),
  amount: Joi.number().min(1).max(1000000).required().messages({
    "number.empty": "Transaction amount is required",
    "number.min": "Transaction amount must be greater than 0",
    "number.max": "Transaction must not exceed 1000000",
    "number.base": "Invalid input. Amount must be a number",
    "number.unsafe": "Invalid input. Amount is too large"
  })
});

module.exports = validator(transactionSchema);
