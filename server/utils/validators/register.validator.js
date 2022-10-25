const Joi = require("joi");
const validator = require("./validator");

const USERNAME_VALIDATOR = /^[a-z0-9]([._-](?![._-])|[a-z0-9]){3,18}[a-z0-9]$/;
const PASSWORD_VALIDATOR =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const registerSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(5)
    .max(30)
    .regex(USERNAME_VALIDATOR)
    .required()
    .messages({
      "string.pattern.base":
        "Username must only contain lowercase letters, numbers, and underscore. No underscore at the beginning and ending of the username.",
      "string.empty": "Username is required",
      "any.required": "Username is required",
      "string.min": "Username must be at least 5 characters",
      "string.max": "Username must be at maximum of 30 characters only"
    }),
  password: Joi.string()
    .min(8)
    .max(32)
    .regex(PASSWORD_VALIDATOR)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain one lowercase letter, one uppercase letter, one number, and one special character",
      "string.min":
        "Password must be at least 8 characters and must contain one lowercase letter, one uppercase letter, one number, and one special character",
      "string.max": "Password must be at maximum of 32 characters",
      "string.empty": "Password is required",
      "any.required": "Password is required"
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password does not match",
    "string.empty": "Password does not match",
    "any.required": "Password does not match"
  })
});

module.exports = validator(registerSchema);
