const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const { error } = Joi.validate(req.body, schema);
      if (error) {
        return next(Err(400, error.message));
      }
      next();
    }
  },

  schemas: {
    profileSchema: Joi.object().keys({
      age: Joi.number().required(),
      gender: Joi.string().valid("male", "female", "unknown").required(),
      servings: Joi.object().keys({
        adults: Joi.number(),
        children: Joi.number()
      }).required(),
      allergies: Joi.array().items(Joi.string()).required(),
      diets: Joi.array().items(Joi.string()).required(),
      dislikes: Joi.array().items(Joi.string()).required(),
      missingEquipment: Joi.array().items(Joi.string()).required(),
      levelPreparation: Joi.string().valid("easy", "medium", "hard").required()
    }),
    favoriteSchema: Joi.object().keys({
      recipeId: Joi.string().required()
    })
  }
}


  