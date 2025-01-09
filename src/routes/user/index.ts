
import express, { Router } from "express";
import truckRoute from "./truck.route";
import UserController from "../../controllers/user";


const userRoute: Router = express.Router();

userRoute.get("/", (req, res) => {
  res.send("<h1>Welcome to SGI-CFA Truck management: User</h1>");
});

userRoute.use("/truck", truckRoute);
userRoute.get("/dashboard", UserController.getDashboard);


export default userRoute;