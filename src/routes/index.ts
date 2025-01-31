
import express, { Router, response } from "express";

import authRoute from "./auth.route";
import userRoute from "./user";
import adminRoute from "./admin";

const appRoute: Router = express.Router();

appRoute.get("/", (req, res) => {
  res.send("<h1>Welcome to SGI-CFA Truck management</h1>");
});

appRoute.use("/auth", authRoute)
appRoute.use("/user", userRoute)
appRoute.use("/admin", adminRoute)

export default appRoute;