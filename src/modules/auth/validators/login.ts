import { validate, Joi } from "express-validation";

const loginValidator = validate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export default loginValidator;
