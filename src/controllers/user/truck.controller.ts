import { Request, response, Response } from "express"
import truckService from "../../services/truck.service";

const TruckController = {
  getTrucks: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await truckService.getTrucks(req)
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
  },
  createTruck: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await truckService.createTruck(req)
      if(!response.status){
        return res.status(400).json(response);
      }
      res.status(200).json(response);
    }catch(err){
      console.log(response);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },

  updateTruck: async (req : Request, res: Response): Promise<any>=>{
    try{
          const response = await truckService.updateTruck(req);
          if(!response.status){
              return res.status(400).json(response);
          }
          res.status(200).json(response)
        }catch(error){
          res.status(500).json({
            message: `Internal Server Error`,status: false})
        }
  },
  deleteTruck: async (req : Request, res: Response): Promise<any>=>{
    try{
          const response = await truckService.deleteTruck(req);
          if(!response.status){
              return res.status(400).json(response);
          }
          res.status(200).json(response)
        }catch(error){
          res.status(500).json({
            message: `Internal Server Error`,status: false})
        }
  },
  getTruckById: async (req : Request, res: Response): Promise<any>=>{
    try{
          const response = await truckService.getTruckById(req);
          if(!response.status){
              return res.status(400).json(response);
          }
          res.status(200).json(response)
        }catch(error){
          res.status(500).json({
            message: `Internal Server Error`,status: false})
        }
  },
  getTruckStatusReport: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await truckService.getTruckStatusReport(req)
      
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


export default TruckController