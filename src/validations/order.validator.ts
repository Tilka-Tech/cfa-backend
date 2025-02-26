import Joi from "joi";

const orderValidation ={
  createOrder:{
    body: Joi.object().keys({
        neededTruckType: Joi.string().required(),
        commodityToDeliver: Joi.string().required(),
        estimatedWeightOfDelivarables: Joi.string().required(),
        numberOfDeleverable: Joi.string().required(),
        pickUpHouseNumber: Joi.string().required(),
        pickupAddress: Joi.string().required(),
        pickUpCity: Joi.string().required(),
        pickUpState: Joi.string().required(),
        deliveryHouseNumber: Joi.string().required(),
        deliveryAddress: Joi.string().required(),
        deliveryCity: Joi.string().required(),
        deliveableState: Joi.string().required(),
        country: Joi.string().required(),
        recipientName: Joi.string().required(),
        recipientPhone: Joi.string().required()
      })
  }
}

export default orderValidation;
