import Joi from "joi";

const truckValidation ={
  createTruck:{  body: Joi.object().keys({
        registrationPaper: Joi.array()
    .items(
      Joi.object({
        originalname: Joi.string().required(),  // File name
        mimetype: Joi.string().valid('image/jpeg', 'application/pdf').required(), // Allowed file types
        buffer: Joi.binary().required(),        // File content
        size: Joi.number().max(5 * 1024 * 1024).required() // Max file size (5MB)
      })
    )
    .min(1) // At least one file is required
    .required(),
        licensePlate: Joi.string().required(),
        truckCapacity: Joi.string().required(),
        truckType: Joi.string().required(),
        ownerId: Joi.string()
    })}
}

export default truckValidation;