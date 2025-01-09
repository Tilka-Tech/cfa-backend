import Joi from "joi";

const AuthValidation = {
  login: {
      body: Joi.object().keys({
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          password: Joi.string()
                .min(8)
                .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                .required()
                .messages({
                  'string.empty': 'Password is required',
                  'string.min': 'Password must be at least 8 characters long',
                  'string.pattern.base':
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                })
      })
  },
  register: {
    body: Joi.object().keys({
      fullname:Joi.string().required().pattern(/^[A-Za-z]+(?: [A-Za-z]+)+$/),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      phone: Joi.string().min(10).max(15).required(),
      password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
          'string.empty': 'Password is required',
          'string.min': 'Password must be at least 8 characters long',
          'string.pattern.base':
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        }),
    }),
  },
  forgotPassword: {
    body: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    })
  },
  verifyToken: {
    body: Joi.object().keys({
      otp: Joi.string().required(),
    })
  },
  resetPassword: {
    body: Joi.object().keys({
      password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
          'string.empty': 'Password is required',
          'string.min': 'Password must be at least 8 characters long',
          'string.pattern.base':
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        }),
      otp: Joi.string().required(),
    })
  },
}


export default AuthValidation