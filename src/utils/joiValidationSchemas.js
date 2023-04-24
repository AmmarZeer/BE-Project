const Joi = require("joi");

const userInputSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
});

const bookValidationSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  userInputSchema,
  bookValidationSchema,
};
