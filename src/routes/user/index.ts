
import express, { Router } from "express";
import truckRoute from "./truck.route";
import UserController from "../../controllers/user";
import { authenticateUser } from "../../middleware/auth";


const userRoute: Router = express.Router();

userRoute.use("/truck", authenticateUser, truckRoute);
userRoute.get("/dashboard", authenticateUser, UserController.getDashboard);


export default userRoute;