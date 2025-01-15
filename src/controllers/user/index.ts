import { Request, Response } from "express"
import truckService from "../../services/truck.service";

const UserController = {
  getDashboard: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await truckService.getDashboardService(req)

      if(!response.status){
        return res.status(400).json(response);
      }
      res.status(200).json(response);
    }catch(err){
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  }
}


export default UserController