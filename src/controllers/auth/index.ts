import { Request, Response } from "express";
import authService from "../../services/auth.service";


const AuthController = {
  postLogIn: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Auth']
        #swagger.description = Login to get user token.
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
      const response = await authService.postLogIn(req);

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
  },

  postCreateUser: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Auth']
        #swagger.description = Register as truck owner.
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/registerSchema"
              },
              example: {
                email: 'johndoe@sample.com',
                password: 'password',
                fullname: 'John Doe',
                phone: '08012345678'
              }
            }
          }
        } 
      */
      const response = await authService.postCreateUser(req);

    /* #swagger.responses[200] = {
      description: "Register response",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/registerSchema"
            },
            example: {
              status: true,
              data: {
                id: '9f9a054b-1dd9-4193-9d99-4b90cbafcc53',
                isVerified: false,
                fullname: 'John Doe',
                email: 'sample@gmail.com',
                phone: "08012345678",
                userType: 'TruckOwner',
                roleId: null,
                status: null,
                createdAt: '2025-02-27T10:52:28.858',
                updatedAt: '2025-02-27T10:52:28.858Z'
              },
              message: 'account created'
            }
          }           
        }
      }
    */
      if(!response.status){
        return res.status(400).json(response);
      }
      res.json(response)
    }catch(err: any){
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },

  forgotPassword: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Auth']
        #swagger.description = request forgot password token.
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/forgotPasswordSchema"
              },
              example: {
                email: 'johndoe@sample.com'
              }
            }
          }
        } 
      */
      const response = await authService.forgotPassword(req);

    /* #swagger.responses[200] = {
      description: "Forgot response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/forgotPasswordSchema"
            },
            example: {
              message: "Token has been sent to your email",
              status: true
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
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },

  verifyToken: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Auth']
        #swagger.description = verify token
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/verifyTokenSchema"
              },
              example: {
                otp: 'johndoe@sample.com'
              }
            }
          }
        } 
      */
      const response = await authService.verifyToken(req);

    /* #swagger.responses[200] = {
      description: "Forgot response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/verifyTokenSchema"
            },
            example: {
              status: true,
              message: "token verified"
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
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },
  
  resetPassword: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Auth']
        #swagger.description = Reset password
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/verifyTokenSchema"
              },
              example: {
                otp: 'johndoe@sample.com',
                password: "password"
              }
            }
          }
        } 
      */
      const response = await authService.resetPassword(req);

    /* #swagger.responses[200] = {
      description: "Forgot response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/verifyTokenSchema"
            },
            example: {
              status: true,
              message: "password reset"
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
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  }
}

export default AuthController
