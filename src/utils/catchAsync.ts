import { Request, Response, NextFunction } from "express";

/**
 * Wraps an asynchronous function to catch any errors and pass them to the error handling middleware.
 * @param fn The asynchronous function to wrap
 * @returns A function that handles asynchronous errors
 */
const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
