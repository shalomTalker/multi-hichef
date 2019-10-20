// const Joi = require('joi');

// module.exports = {
//   validateBody: (schema) => {
//     return (req, res, next) => {
//       const { error } = Joi.validate(req.body, schema);
//       if (error) {
//         return next(Err(400, error.message));
//       }
//       next();
//     }
//   },

//   schemas: {
//     preferenceSchema: Joi.object().keys({
//       ingredients: Joi.object().keys({
//         main: Joi.string(),
//         baseOn: Joi.string()
//       }),
//       cookingTime: Joi.string()
//     })
//   }
// }