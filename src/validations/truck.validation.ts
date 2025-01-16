import Joi from "joi";

const truckValidation ={
  createTruck:{  body: Joi.object().keys({
    //     registrationPapers: Joi.array()
    // .items(
    //   Joi.object({
    //     fieldname: Joi.string().valid('registrationPapers').required(), // Validate the field name
    //     originalname: Joi.string().required(),  // File name
    //     encoding: Joi.string().valid('7bit', 'base64').required(), 
    //     mimetype: Joi.string().valid('image/jpeg', 'image/png', 'application/pdf').required(), // Allowed file types
    //     buffer: Joi.binary().required(),        // File content
    //     size: Joi.number().max(5 * 1024 * 1024).required() // Max file size (5MB)
    //   })
    // )
    // .min(1) // At least one file is required
    // .required(),
        licensePlate: Joi.string().required(),
        truckCapacity: Joi.string().required(),
        truckType: Joi.string().required(),
        ownerId: Joi.string()
    })}
}

export default truckValidation;