import Joi from "joi";

const orderValidation ={
  createOrder:{
    body: Joi.object().keys({
        neededTruckType: Joi.string().required(),
        commodityToDeliver: Joi.string().required(),
        estimatedWeightOfDelivarables: Joi.string().required(),
        numberOfDeleverable: Joi.string().required(),
        pickupId: Joi.string().uuid().required(),
        deliveryId: Joi.string().uuid().required(),
        recipientName: Joi.string().required(),
        recipientPhone: Joi.string()
        .pattern(/^\+?[1-9]\d{1,14}$/)
        .required(),
      })
   },
  createAdress: {
    body: Joi.object().keys({
      pickUpHouseNumber: Joi.string(),
      pickupAddress: Joi.string(),
      pickUpCity: Joi.string(),
      pickUpState: Joi.string(),
      deliveryHouseNumber: Joi.string(),
      deliveryAddress: Joi.string(),
      deliveryCity: Joi.string(),
      deliveableState: Joi.string(),
      country: Joi.string().required()
    })
  }
}

export default orderValidation;
