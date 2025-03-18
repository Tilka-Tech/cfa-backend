
import express, { Router } from "express";
import TruckController from "../../controllers/user/truck.controller";
import validate from "../../validations/validate";
import truckValidation from "../../validations/truck.validation";


const truckRoute: Router = express.Router();

truckRoute.get("/", TruckController.getTrucks);
truckRoute.get('/completed', TruckController.getCompletedJobs)
truckRoute.post("/", validate(truckValidation.createTruck), TruckController.createTruck);
truckRoute.patch("/:id", validate(truckValidation.updateTruck), TruckController.updateTruck);
truckRoute.delete("/:id", TruckController.deleteTruck);
truckRoute.get("/truck-status-report", TruckController.getTruckStatusReport);
truckRoute.get("/:id", TruckController.getTruckById);



export default truckRoute;