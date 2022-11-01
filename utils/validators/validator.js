/**
 * Validate if the field values satisfies the validation schema
 * @param schema Joi validation schema
 * @returns Returns a function that accepts a payload of field values as an argument
 */

module.exports = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: true });
};
