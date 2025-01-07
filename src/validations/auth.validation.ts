import Joi from "joi";

const login = {
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
}


export  default {
    login
}