
import express, { Router, response } from "express";
import dashboardRoute from "./dashboard.route";
import userRoute from "./user.route";
import bookingRoute from "./booking.route";
import truckRoute from "./truck.route";


const adminRoute: Router = express.Router();

adminRoute.use("/dashboard", dashboardRoute);
adminRoute.use("/user", userRoute);
adminRoute.use("/booking", bookingRoute);
adminRoute.use("/truck", truckRoute);


export default adminRoute;