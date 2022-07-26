import { validate, Joi } from "express-validation";

const createValidator = validate({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    profilePicture: Joi.string().required(),
  }),
})

export default createValidator;