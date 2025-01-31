
import express, { Router, response } from "express";
import DashboardController from "../../controllers/admin/dashboard.controller";


const dashboardRoute: Router = express.Router();

dashboardRoute.post("/", DashboardController.getAnalytics)


export default dashboardRoute;