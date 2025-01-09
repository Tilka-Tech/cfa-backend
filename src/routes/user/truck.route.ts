
import express, { Router, response } from "express";
import TruckController from "../../controllers/user/truck.controller";


const truckRoute: Router = express.Router();

truckRoute.get("/", TruckController.getTrucks);
truckRoute.post("/", TruckController.createTruck);
truckRoute.patch("/", TruckController.updateTruckStatus);


export default truckRoute;