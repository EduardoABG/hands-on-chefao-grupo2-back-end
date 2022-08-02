import { validate, Joi } from "express-validation";

const updateValidator = validate({
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    salary: Joi.number(),
    companyName: Joi.string(),
    status: Joi.string(),
    date: Joi.date(),
    location: Joi.string(),
    jobPicture: Joi.any(),
    proficiency: Joi.string(),
    workingTime: Joi.string(),
    workingMode: Joi.string(),
    hiringRegime: Joi.string(),
    stage: Joi.array().items(Joi.object({
      title: Joi.string(),
      numberOfCandidates: Joi.number(),
      status: Joi.string(),
    })),
  }),
});

export default updateValidator;
