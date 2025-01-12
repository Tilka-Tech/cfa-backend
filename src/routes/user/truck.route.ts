
import express, { Router, response } from "express";
import TruckController from "../../controllers/user/truck.controller";
import validate from "../../validations/validate";
import truckValidation from "../../validations/truck.validation";
import { authenticateUser } from "../../middleware/auth";


const truckRoute: Router = express.Router();

truckRoute.get("/", TruckController.getTrucks);
truckRoute.post("/", authenticateUser ,validate(truckValidation.createTruck), TruckController.createTruck);
truckRoute.patch("/", TruckController.updateTruckStatus);


export default truckRoute;