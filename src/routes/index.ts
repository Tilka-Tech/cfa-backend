
import express, { Router, response } from "express";

import authRoute from "./auth.route";

const appRoute: Router = express.Router();

appRoute.get("/", (req, res) => {
  res.send("<h1>Welcome to SGI-CFA Truck management</h1>");
});

appRoute.use("/auth", authRoute)

export default appRoute;