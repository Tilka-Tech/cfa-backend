import { Request, Response } from "express"
import truckService from "../../services/truck.service";

const UserController = {
  getDashboard: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Users']
        #swagger.description = get user dashboard data
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/loginSchema"
              },
              example: {
                email: 'johndoe@sample.com',
                password: "password"
              }
            }
          }
        } 
      */
      const response = await truckService.getDashboardService(req);

    /* #swagger.responses[200] = {
      description: "Login response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/loginSchema"
            },
            example: {
              status: true,
              data: {
                email: 'johndoe@sample.com',
                fullname: 'John Doe',
                phone: '08012345678'
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