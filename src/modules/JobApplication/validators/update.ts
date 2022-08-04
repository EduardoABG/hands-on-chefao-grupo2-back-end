import { validate, Joi } from "express-validation";

const updateValidator = validate({
  body: Joi.object({
    status: Joi.number(),
    feedback: Joi.object({
      letter: Joi.string(),
      area: Joi.array().items(Joi.object({
        title: Joi.string(),
        content: Joi.array().items(Joi.object({
          text: Joi.string(),
          link: Joi.string()
        }))
      }))
    }),
    applicationDate: Joi.date(),
    user: Joi.string(),
    job: Joi.object({
      _id: Joi.string(),
      name: Joi.string(),
      companyName: Joi.string()
    })
  }),
});

export default updateValidator;
