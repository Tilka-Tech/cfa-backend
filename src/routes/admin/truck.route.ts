
import express, { Router } from "express";
import TruckController from "../../controllers/admin/truck.controller";


const truckRoute: Router = express.Router();

truckRoute.put("/update-truck-status/:id", TruckController.updateTruckStatus)
truckRoute.get("/", TruckController.getTrucks)
truckRoute.get("/:id", TruckController.getOneTruck)


export default truckRoute;