import Joi from "joi";

export const programSchema = Joi.object({
  title: Joi.string().required(),
  synopsis: Joi.string().required(),
  poster: Joi.string().uri().required(),
  country: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  category_id: Joi.number().integer().required(),
});
