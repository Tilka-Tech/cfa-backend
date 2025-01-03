import { NextFunction, Response, Request } from "express";


export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let path = req.originalUrl;
    const user = req.user;
    const method = req.method;
    const roleId = user.role;
    const token = req.headers.authorization as string;
    // console.log(user)
    // const service = user.services

    next();
  } catch (error: any) {
    console.log("error", error);
    return res.status(500).json({
      message: `Error: ${error}`,
      status: false,
    });
  }
};
