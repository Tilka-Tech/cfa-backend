
import express, { Router, response } from "express";


const userRoute: Router = express.Router();

userRoute.get("/", (req, res) => {
  res.send("<h1>Welcome to SGI-CFA Truck management: User</h1>");
});


export default userRoute;