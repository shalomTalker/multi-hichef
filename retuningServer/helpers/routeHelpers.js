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
    tuningSchema: Joi.object().keys({
      tuneIngredients: Joi.array(),
      tuneAmount: Joi.number(),
      tuneTiming: Joi.number(),
      tuneSpecial: Joi.string(),
      tuneEquipment:Joi.array(),
      tuneLevelPreparation:Joi.string(),
      tuneMethods: Joi.array()
    }).allow('tuneIngredients','tuneLevelPreparation','tuneAmount', 'tuneTiming', 'tuneSpecial' ,'tuneEquipment','tuneMethods' )
  }
}