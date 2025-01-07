import Joi from 'joi';

const register = {
  body: Joi.object().keys({
    fullName:Joi.string().required().pattern(/^[A-Za-z]+(?: [A-Za-z]+)+$/),
    // firstName: Joi.string(),
    // lastName: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().min(10).max(15).required(),
    userType: Joi.string().valid('Admin', 'User', 'Driver', 'TruckOwner').required().messages({
      'any.only': 'User type must be one of [Admin, User, Driver, TruckOwner]',
      'string.empty': 'User type is required',
    }),
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
    addresses: Joi.object().keys({
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.string().required(),
      landmark: Joi.string().required(),
      postalCode: Joi.string().required(),
      status: Joi.boolean().required(),
      isDefault: Joi.boolean().required(),
    }).optional(),
  }),
};

export default {
  register,
};
