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

        // console.log("User role:", foundUser.role);
        // console.log("Permissions:", permissions);
        // console.log("Requested URL:", req.originalUrl);

        if (permissions.length === 0) {
            res.status(403).json({
                message: "Unauthorized - No permissions assigned",
                status: false,
            });
            return;
        }

        // Check if any permission matches the request URL
        const hasPermission = permissions.some((obj: { route: string }) => obj.route === req.originalUrl);

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
