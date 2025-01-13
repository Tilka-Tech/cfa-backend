import { NextFunction, Request, Response } from "express";
import { verifyToken, verifyJWT } from "../utils/jwt";


/// verify JWT middleware
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const decodedToken: any = await verifyJWT(token);
      if (!decodedToken) {
        res.status(401).json({
          message: "Invalid token",
          status: false,
        });
        return; // Ensure we return after sending the response
      }

      if (!decodedToken.sub.isVerified) {
        res.status(401).json({
          message: "User Pending Approval",
          status: false,
        });
        return; // Ensure we return after sending the response
      }
      req.user = decodedToken.sub;
      next(); // Call next() to proceed to the next middleware/route
    } else {
      res.status(401).json({
        message: "No token provided",
        status: false,
      });
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        message: `Token expired`,
        status: false,
      });
      return;
    }
    res.status(500).json({
      message: `Error: ${error.message}`,
      status: false,
    });
  }
};
