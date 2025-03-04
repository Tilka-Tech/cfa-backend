import { Request, Response } from "express";
import BookingService from "../../services/admin/booking.service";


const BookingController = {
  getBookings: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = Get lists of all users
        #swagger.parameters['pageSize'] = {
          in: 'query',
          description: 'page size',
          type: 'number'
        }
        #swagger.parameters['page'] = {
          in: 'query',
          description: 'page number',
          type: 'number'
        }
        #swagger.parameters['status'] = {
          in: 'query',
          name: 'status',
          description: 'Fetch bookings by status',
          required: false,
          schema: {
            type: 'string',
            enum: ['Acive', 'In_Progress', 'Pending', 'COmpleted']
          }
        }
      */
      const response = await BookingService.getBookings(req);

    /* #swagger.responses[200] = {
      description: "Get all bookings response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/orderSchema"
            },
            example: {
              status: true,
              data: [],
              message: "Successful message"
            }
          }           
        }
      }
    */
      if(!response.status){
        return res.status(400).json(response);
      }
      res.json(response)
    }catch(err){
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },

  getOneBooking: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = Get one user by id
      */
      const response = await BookingService.getOneBooking(req);

    /* #swagger.responses[200] = {
      description: "Get single booking response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/orderSchema"
            },
            example: {
              status: true,
              data: {},
              message: "Successful message"
            }
          }           
        }
      }
    */
      if(!response.status){
        return res.status(400).json(response);
      }
      res.json(response)
    }catch(err){
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },

  updateBooking: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = Update booking status.
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/updateStatusSchema"
              },
              example: {
                status: 'Pending',
              }
            }
          }
        } 
      */
      const response = await BookingService.updateBooking(req);

    /* #swagger.responses[200] = {
      description: "Update booking response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/loginSchema"
            },
            example: {
              status: true,
              data: {},
              message: "Successful message"
            }
          }           
        }
      }
    */
      if(!response.status){
        return res.status(400).json(response);
      }
      res.json(response)
    }catch(err){
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },

  assignTruckAndDriver: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = 'Assign truck and driver to order.
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/orderSchema"
              },
              example: {
                truckId: '62d5eaad-ce6a-4429-bc8d-8d1aae850de7',
                driverId: "62d5eaad-ce6a-4429-bc8d-8d1aae850de7"
              }
            }
          }
        } 
      */
      const response = await BookingService.assignTruckAndDriver(req);

    /* #swagger.responses[200] = {
      description: "Assign driver and truck to booking response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/loginSchema"
            },
            example: {
              status: true,
              data: {},
              message: "Successful message"
            }
          }           
        }
      }
    */
      if(!response.status){
        return res.status(400).json(response);
      }
      res.json(response)
    }catch(err){
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },

}

export default BookingController
