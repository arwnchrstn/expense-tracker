const Joi = require("joi");
const validator = require("./validator");

const deleteAccountSchema = Joi.object({
  confirmation: Joi.string().valid("/delete my account").required().messages({
    "string.empty": "Please type /delete my account to proceed",
    "any.required": "Please type /delete my account to proceed",
    "any.only": "Please type /delete my account to proceed"
  }),
  confirmPassword: Joi.string().required().messages({
    "string.empty": "Please type your password",
    "any.required": "Please type your password"
  })
});

module.exports = validator(deleteAccountSchema);
