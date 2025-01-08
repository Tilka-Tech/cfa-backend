import { Request, Response } from "express";
import authService from "../../services/auth.service";


const AuthController = {
  postLogIn: async (req: Request, res: Response ): Promise<any> =>{
    try{
      const response = await authService.postLogIn(req);
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

  postCreateUser: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await authService.postCreateUser(req)

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

  forgotPassword: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await authService.forgotPassword(req)

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

  verifyToken: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await authService.verifyToken(req)
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
  
  resetPassword: async (req : Request, res: Response): Promise<any>=>{
    try{
      const response = await authService.resetPassword(req)
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

export default AuthController
