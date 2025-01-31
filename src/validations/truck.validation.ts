import Joi from "joi";

const truckValidation ={
  createTruck:{
    body: Joi.object().keys({
      registrationPapers: Joi.array()
        .items(
          Joi.object({
            url: Joi.string().required(), // Validate the field name
            key: Joi.string().required(),  // File name
          })
        )
        .min(1) // At least one file is required
        .required(),
      licensePlate: Joi.string().required(),
      truckCapacity: Joi.string().required(),
      truckType: Joi.string().required(),
      ownerId: Joi.string()
      })
  },

  updateTruck:{
    body: Joi.object().keys({
      registrationPapers: Joi.array()
        .items(
          Joi.object({
            url: Joi.string().required(), // Validate the field name
            key: Joi.string().required(),  // File name
          })
        )
        .min(1), // At least one file is required
      licensePlate: Joi.string(),
      truckCapacity: Joi.string(),
      truckType: Joi.string(),
      ownerId: Joi.string()
      })
  }
}

export default truckValidation;