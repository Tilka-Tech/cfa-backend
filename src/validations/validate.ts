import joi from "joi";
import { Request, Response, NextFunction } from "express";

const pick = (object: any, keys: any) => {
  return keys.reduce((obj: any, key: any) => {
    // uses the hasOwnProperty to check if a value in the keys exist in the object
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    // check if schema has any of the following "params", "query", "body", "files"
    // returns a new object with key equal to any of the following "params", "query", "body", "files" if it exist
    const validSchema = pick(schema, ["params", "query", "body", "files"]);

    // check if request object has any of the keys that exist in validSchema as its property
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = joi
      .compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
        if (error) {
            const errorMessage = error.details
              .map((details) => details.message)
              .join(", ");
            // Pass the error to the next error handler instead of returning a Response
            // return next(new Error(errorMessage));
            res.status(400).json({
                message: "Validation error",
                errors: errorMessage,
                status: false,
              });
              return;
          }
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
