
import express, { Router, response } from "express";
import UserController from "../../controllers/admin/user.controller";


const userRoute: Router = express.Router();

userRoute.post("/", UserController.createUser);
userRoute.get("/", UserController.getUsers);
userRoute.get("/permission", UserController.getPermissions);
userRoute.get("/permission/:id", UserController.getOnePermission);
userRoute.post("/role", UserController.createRole);
userRoute.get("/role", UserController.getRoles);
userRoute.get("/role/:id", UserController.getOneRole);
userRoute.patch("/update-user-status/:userId", UserController.updateUserStatus);
userRoute.post("/add-role-permissions", UserController.addRoleToPermissions)
userRoute.post("/assign-role-user", UserController.assignRoleToUser)
userRoute.get("/:id", UserController.getOneUser);


export default userRoute;