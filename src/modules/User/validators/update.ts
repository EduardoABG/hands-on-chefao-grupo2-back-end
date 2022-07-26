import { validate, Joi } from "express-validation";

const updateValidator = validate({
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    phone: Joi.string(),
    birthDate: Joi.date(),
    aboutMe: Joi.string(),
    profilePicture: Joi.string(),
    resume: Joi.object({
      employmentHistory: Joi.array().items(Joi.string()),
      education: Joi.array().items(Joi.string()),
      certificates: Joi.array().items(Joi.string()),
      languages: Joi.array().items(Joi.string()),
      linkedin: Joi.string(),
      portfolio: Joi.string(),
      address: Joi.string(),
      salary: Joi.number(),
      RG: Joi.string(),
      CPF: Joi.string(),
    })
  }),
})

export default updateValidator;