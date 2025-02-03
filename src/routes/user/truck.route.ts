
import express, { Router } from "express";
import TruckController from "../../controllers/user/truck.controller";
import validate from "../../validations/validate";
import truckValidation from "../../validations/truck.validation";
// import multer, { FileFilterCallback }  from "multer";
// import { randomUUID } from "crypto";


const truckRoute: Router = express.Router();

// Storage configuration
// const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'tempImageStorage');
//   },
//   // filename: (req, file, cb) => {
//   //   const uuid = randomUUID();
//   //   const extension = file.originalname.split('.').pop(); // Get file extension
//   //   cb(null, `${file.fieldname}-${uuid}.${extension}`);
//   // }
// });

// File filter configuration
// const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback)=> {
//   if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'application/pdf') {
//     return cb(null, false); // Reject invalid file types
//   }
//   cb(null, true); // Accept valid file types
// };

// const limits = {
//   fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
// };

// const upload = multer({ storage, fileFilter ,limits }).array('registrationPapers')

truckRoute.get("/", TruckController.getTrucks);
truckRoute.get('/completed', TruckController.getCompletedJobs)
truckRoute.post("/", validate(truckValidation.createTruck), TruckController.createTruck);
truckRoute.patch("/:truckId", validate(truckValidation.updateTruck), TruckController.updateTruck);
truckRoute.delete("/:truckId", TruckController.deleteTruck);
truckRoute.get("/truck-status-report", TruckController.getTruckStatusReport);
truckRoute.get("/:truckId", TruckController.getTruckById);



export default truckRoute;