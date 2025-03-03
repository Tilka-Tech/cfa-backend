
import express, { Router } from "express";
import TruckController from "../../controllers/admin/truck.controller";


const truckRoute: Router = express.Router();

truckRoute.put("/update-truck-status/:truckId", TruckController.updateTruckStatus)
truckRoute.get("/", TruckController.getTrucks)
truckRoute.get("/:truckId", TruckController.getOneTruck)


export default truckRoute;