import { NextFunction, Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

export const authorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user } = req;

        const foundUser = await prismaClient.user.findUnique({
            where: {id: user.id},
            include: {
                role:{
                    include: { permissions: true}
                }
            }
        })

        if (!foundUser || !foundUser.role || !foundUser.role.permissions) {
            res.status(403).json({
                message: "Unauthorized - No role or permissions assigned",
                status: false,
            });
            return;
        }

        const { permissions } = foundUser.role;

        if (permissions.length === 0) {
            res.status(403).json({
                message: "Unauthorized - No permissions assigned",
                status: false,
            });
            return;
        }

        let requestUrl
         // Convert URL parameters to pattern
         // this is use to handle dynamic id
        requestUrl = req.originalUrl.replace(/\/[0-9a-fA-F-]{36}/g, '/{id}');
        // Remove query parameters if present
        if (req.originalUrl.includes("?")) {
            requestUrl = requestUrl.slice(0, req.originalUrl.indexOf("?"));
        }
        // Check if any permission matches the request URL
        const hasPermission = permissions.some((obj: { route: string, method: string }) => obj.route === requestUrl && obj.method === req.method);

        if (!hasPermission) {
            res.status(403).json({
                message: "Unauthorized - No matching permission",
                status: false,
            });
            return;
        }

        next();
    } catch (error) {
        console.error("Authorization Middleware Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            status: false,
        });
    }
};
