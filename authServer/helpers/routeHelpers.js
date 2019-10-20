const Joi = require('joi');

module.exports = {
  isVerified: (req, res, next) => {
    // Make sure the user has been verified
    if (req.user.methods.includes('local')) {
      if (!req.user.local.isVerified) {
        return next(Err(403, 'This user does not verified his email'));
      }
    }
    next()
  },
  validateBody: (schema) => {
    return (req, res, next) => {
      const {error} = Joi.validate(req.body, schema);
      if (error) {
        return next(Err(400,error.message));
      }
      next();

    }
  },

  schemas: {
    signupSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required()
    }),
    signinSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
}