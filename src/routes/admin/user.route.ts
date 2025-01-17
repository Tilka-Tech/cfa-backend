
import express, { Router, response } from "express";
import DashboardController from "../../controllers/admin/dashboard.controller";
import UserController from "../../controllers/admin/user.controller";


const userRoute: Router = express.Router();

userRoute.post("/", UserController.createUser)
userRoute.get("/", UserController.getUsers)
userRoute.get("/:id", UserController.getOneUser)
userRoute.post("/role", UserController.createRole)
userRoute.get("/role", UserController.getRoles)
userRoute.get("/role/:id", UserController.getOneRole)


export default userRoute;