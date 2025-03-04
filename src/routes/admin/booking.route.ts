
import express, { Router, response } from "express";
import BookingController from "../../controllers/admin/bookings.controller";


const bookingRoute: Router = express.Router();
bookingRoute.put("/:id", BookingController.updateBooking)
bookingRoute.get("/", BookingController.getBookings)
bookingRoute.get("/:id", BookingController.getOneBooking)
bookingRoute.put("/assign", BookingController.assignTruckAndDriver)

export default bookingRoute;