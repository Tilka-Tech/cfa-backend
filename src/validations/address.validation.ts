import Joi from 'joi';

const createAddress = {
  body: Joi.object().keys({
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
};


export default {
    createAddress
}

