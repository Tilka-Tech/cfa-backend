
class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public status: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  static fromAxiosError(error: any): ApiError {
    if (
      error.isAxiosError &&
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      const errorMessage =
        error.response.data.message || "server error occurred";
      return new ApiError(
        error.response.status,
        errorMessage,
        true,
        error.stack
      );
    } else {
      return new ApiError(500, "Internal Server Error", true, error.stack);
    }
  }
}

export default ApiError;
