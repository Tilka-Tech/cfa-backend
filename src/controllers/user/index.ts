import { Request, Response } from "express"
import truckService from "../../services/truck.service";

const UserController = {
  getDashboard: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Users']
        #swagger.description = get user dashboard data
      */
      const response = await truckService.getDashboardService(req);

    /* #swagger.responses[200] = {
      description: "dashboard response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/truckRegistrationSchema"
            },
            example: {
              status: true,
              data: {
              totalTrucks: 8,
              onTransitTrucks: 1,
              completedTrips: 0,
              completedJob: [
                {
                id: "73823288-96e7-4d1e-8d68-a6eb4f862d26",
                userId: "c03dafef-18bd-472a-9ef5-4f2eef1d30a8",
                truckId: null,
                pickupId: "1d72eeb4-b3be-42f2-9851-952f00e99c60",
                deliveryId: "a0766d13-a58a-49e3-b5de-a17a6d6ff4d6",
                neededTruckType: "hiab",
                commodityToDeliver: "coacoa",
                estimatedWeightOfDelivarables: "400kg",
                numberOfDeleverable: "20",
                recipientName: "Adam Lalana",
                recipientPhone: "08098634548",
                status:"Completed",
                createdAt: "2025-02-21T02:57:51.342Z",
                updatedAt: "2025-02-21T02:57:51.342Z"
                }
              ]
            },
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
  }
}


export default UserController