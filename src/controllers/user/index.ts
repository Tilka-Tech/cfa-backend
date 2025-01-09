import { Request, Response } from "express"
import userService from "../../services/user.service";

const UserController = {
  getDashboard: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await userService.postCreateUser(req)

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