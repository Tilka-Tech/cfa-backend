
import express, { Router } from "express";
import truckRoute from "./truck.route";
import UserController from "../../controllers/user";


const userRoute: Router = express.Router();

userRoute.use("/truck", truckRoute);
userRoute.get("/dashboard", UserController.getDashboard);


export default userRoute;