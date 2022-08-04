import { validate, Joi } from "express-validation";

const createValidator = validate({
  body: Joi.object({
    job_id: Joi.string().required(),
  }),
});

export default createValidator;
