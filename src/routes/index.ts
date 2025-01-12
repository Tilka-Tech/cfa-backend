
import express, { Router, response } from "express";

import authRoute from "./auth.route";
import userRoute from "./user";

const appRoute: Router = express.Router();

appRoute.get("/", (req, res) => {
  res.send("<h1>Welcome to SGI-CFA Truck management</h1>");
});

appRoute.use("/auth", authRoute)
appRoute.use(userRoute)

export default appRoute;