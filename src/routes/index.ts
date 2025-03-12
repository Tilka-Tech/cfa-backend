
import express, { Router, response } from "express";

import authRoute from "./auth.route";
import userRoute from "./user";
import adminRoute from "./admin";
import orderRouter from "./order/order.route";
import { authenticateUser } from "../middleware/auth";
import { authorization } from "../middleware/authorization";

const appRoute: Router = express.Router();

appRoute.get("/", (req, res) => {
  res.send("<h1>Welcome to SGI-CFA Truck management</h1>");
});

appRoute.use("/auth", authRoute)
appRoute.use("/user", authenticateUser, authorization, userRoute)
appRoute.use("/admin", authenticateUser, authorization, adminRoute)
appRoute.use("/order", authenticateUser, orderRouter)

export default appRoute;