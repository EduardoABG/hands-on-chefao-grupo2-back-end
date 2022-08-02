import { validate, Joi } from "express-validation";

const updateValidator = validate({
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.number().required(),
    companyName: Joi.string().required(),
    status: Joi.string().required(),
    date: Joi.date().required(),
    location: Joi.string().required(),
    jobPicture: Joi.any(),
    proficiency: Joi.string().required(),
    workingTime: Joi.string().required(),
    workingMode: Joi.string().required(),
    hiringRegime: Joi.string().required(),
    stage: Joi.array().items(Joi.object({
      title: Joi.string().required(),
      numberOfCandidates: Joi.number().required(),
      status: Joi.string().required(),
    })).required(),
  }),
});

export default updateValidator;
