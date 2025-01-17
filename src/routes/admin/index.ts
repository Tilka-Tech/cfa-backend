
import express, { Router, response } from "express";
import dashboardRoute from "./dashboard.route";
import userRoute from "./user.route";


const adminRoute: Router = express.Router();

adminRoute.use("/dashboard", dashboardRoute);
adminRoute.use("/user", userRoute);


export default adminRoute;