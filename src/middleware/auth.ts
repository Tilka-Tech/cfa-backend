import { NextFunction, Request, Response } from "express";
import { verifyToken, verifyJWT } from "../utils/jwt";

/// verify JWT middleware
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const decodedToken: any = await verifyJWT(token);
      if (!decodedToken) {
        return res.status(401).json({
          message: "Invalid token",
          status: false,
        });
      }
      req.user = decodedToken.sub;

      next();
    } else {
      res.status(401).json({
        message: "No token provided",
        status: false,
      });
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: `Token expired`,
        status: false,
      });
    }
    return res.status(500).json({
      message: `Error: ${error}`,
      status: false,
    });
  }
};
