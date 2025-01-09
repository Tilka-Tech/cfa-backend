
import express, { Router, response } from "express";


const adminRoute: Router = express.Router();

adminRoute.get("/", (req, res) => {
  res.send("<h1>Welcome to SGI-CFA Truck management: Admin</h1>");
});


export default adminRoute;