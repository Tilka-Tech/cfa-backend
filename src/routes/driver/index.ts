
import express, { Router, response } from "express";


const adminRoute: Router = express.Router();

adminRoute.get("/", (req, res) => {
  /*
    #swagger.tags= ['Driver']
    #swagger.description = Welcome to driver routes
  */
  res.send("<h1>Welcome to SGI-CFA Truck management: Driver</h1>");
});


export default adminRoute;