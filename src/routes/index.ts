
import express, { Router, response } from "express";

import userRoute from "./user.route";
import authRoute from "./auth.route";

const appRoute: Router = express.Router();

appRoute.get("/", (req, res) => {
  res.send("<h1>Welcome to SGI-CFA Truck management</h1>");
});


appRoute.use("/user", userRoute)
appRoute.use("/auth", authRoute)

export default appRoute;