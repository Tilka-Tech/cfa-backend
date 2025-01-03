
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const httpStatus = require("http-status");
import logger from '../config/logger';
import ApiError from '../utils/ApiError';
import { Request, Response, NextFunction } from 'express';

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      (error instanceof PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR);
    const message = error.message || 'server error occurred';
    const status = false;
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message, stack } = err;
  if (process.env.ENV === 'production' && !(err instanceof ApiError)) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    stack = undefined;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    status: false,
    ...(process.env.ENV === 'development' && { stack }),
  };

  console.log(err);

  if (process.env.ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
