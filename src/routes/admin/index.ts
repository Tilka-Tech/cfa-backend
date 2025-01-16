
import express, { Router, response } from "express";
import dashboardRoute from "./dashboard.route";


const adminRoute: Router = express.Router();

adminRoute.use("/dashboard", dashboardRoute);


export default adminRoute;