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
              completedTrips: 0
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