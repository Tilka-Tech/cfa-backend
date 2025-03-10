import { Request, Response } from "express";
import AdminService from "../../services/admin/admin.service";


const UserController = {
  getUsers: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = Get lists of all users
               #swagger.parameters['status'] = {
          in: 'query',
          name: 'status',
          description: 'Fetch trucks by status',
          required: false,
          schema: {
            type: 'string',
            enum: ['Active', 'Pending', 'Suspendend']
          }
        }
         #swagger.parameters['search'] = {
          in: 'query',
          name: 'search',
          description: 'Fuzzy search for users by full name or email',
          required: false,
          schema: {
            type: 'string'
          }
        }
        #swagger.parameters['pageNumber'] = {
          in: 'query',
          name: 'pageNumber',
          description: 'pagination',
          required: false,
          schema: {
            type: 'number'
          }
        }
        #swagger.parameters['pageSize'] = {
          in: 'query',
          name: 'pageSize',
          description: 'pagination',
          required: false,
          schema: {
            type: 'number'
          }
        }
      */
      const response = await AdminService.getUsers(req);

    /* #swagger.responses[200] = {
      description: "all user response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/loginSchema"
            },
            example: {
              status: true,
              data: [{
                "userType": "Admin",
                "createdAt": "2025-03-01T15:33:21.397Z",
                "email": "sample@yopmail.com",
                "fullname": "Tech Admin",
                "isVerified": true,
                "phone": "08012345678",
                "role": null,
                "status": "Active",
                "createBy": []
            },
            {
                "userType": "TruckOwner",
                "createdAt": "2025-03-01T15:32:10.929Z",
                "email": "sample@gmail.com",
                "fullname": "Jane Doe",
                "isVerified": true,
                "phone": "08012345678",
                "role": null,
                "status": "Active",
                "createBy": [
                    {
                        "capacity": "2500 tone",
                        "type": "bugati",
                        "registrationPapers": [
                            {
                                "key": "zlhzrwg420rw9y464px7",
                                "url": "https://res.cloudinary.com/dnaj0avcy/image/upload/v1738577300/zlhzrwg420rw9y464px7.png"
                            }
                        ],
                        "id": "e03171ee-c958-422b-b476-8af181965f3e",
                        "plateNumber": "12132432424",
                        "status": "In_Active",
                        "ownerId": "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                        "createdById": "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                        "driverId": null,
                        "locationId": null,
                        "createdAt": "2025-03-01T19:08:37.952Z",
                        "updatedAt": "2025-03-01T19:24:36.544Z"
    }]}],
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

  getOneUser: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = Get one user by id
      */
      const response = await AdminService.getOneUser(req);

    /* #swagger.responses[200] = {
      description: "get a user by id response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/loginSchema"
            },
            example: {
              status: true,
              data:  {
                "userType": "TruckOwner",
                "createdAt": "2025-03-01T15:32:10.929Z",
                "email": "sample@gmail.com",
                "fullname": "Jane Doe",
                "isVerified": true,
                "phone": "08012345678",
                "role": null,
                "status": "Active",
                "createBy": [
                    {
                        "capacity": "2500 tone",
                        "type": "bugati",
                        "registrationPapers": [
                            {
                                "key": "zlhzrwg420rw9y464px7",
                                "url": "https://res.cloudinary.com/dnaj0avcy/image/upload/v1738577300/zlhzrwg420rw9y464px7.png"
                            }
                        ],
                        "id": "e03171ee-c958-422b-b476-8af181965f3e",
                        "plateNumber": "12132432424",
                        "status": "In_Active",
                        "ownerId": "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                        "createdById": "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                        "driverId": null,
                        "locationId": null,
                        "createdAt": "2025-03-01T19:08:37.952Z",
                        "updatedAt": "2025-03-01T19:24:36.544Z"
                    }
                ],
                "transaction": [],
                "order": [],
                "addresses": [],
                "roleId": null,
                "truck": [
                    {
                        "capacity": "2500 tone",
                        "type": "bugati",
                        "registrationPapers": [
                            {
                                "key": "zlhzrwg420rw9y464px7",
                                "url": "https://res.cloudinary.com/dnaj0avcy/image/upload/v1738577300/zlhzrwg420rw9y464px7.png"
                            }
                        ],
                        "id": "e03171ee-c958-422b-b476-8af181965f3e",
                        "plateNumber": "12132432424",
                        "status": "In_Active",
                        "ownerId": "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                        "createdById": "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                        "driverId": null,
                        "locationId": null,
                        "createdAt": "2025-03-01T19:08:37.952Z",
                        "updatedAt": "2025-03-01T19:24:36.544Z"
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
  },

  getRoles: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = Get all roles
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
      const response = await AdminService.getRoles(req);

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

  getOneRole: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = 'get single role by id.
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
      const response = await AdminService.getOneRole(req);

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

  createRole: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = 'Create new role.
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
      const response = await AdminService.createRole(req);

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
  getPermissions: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = Get all roles
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
      const response = await AdminService.getPermissions(req);

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
  getOnePermission: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = 'get single role by id.
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
      const response = await AdminService.getOnePermission(req);

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

  addRoleToPermissions: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = 'Create new role.
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
      const response = await AdminService.addRoleToPermissions(req);

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
  assignRoleToUser: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = 'Create new role.
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
      const response = await AdminService.assignRoleToUser(req);

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
  createUser: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Admin']
        #swagger.description = 'Create new user.
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
        #swagger.responses[200] = {
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
      const response = await AdminService.createUser(req);
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

  updateUserStatus: async (req: Request, res: Response ): Promise<any> =>{
    try{

       /*
        #swagger.tags= ['Admin']
        #swagger.description = Update user statua.
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/updateStatusSchema"
              },
              example: {
                status: 'Active'
              }
            }
          }
        } 
        #swagger.responses[200] = {
          description: "Update status response",
          content: {
            "application/json": {
              schema:{
                $ref: "#/components/schemas/updateStatusSchema"
              },
              example: {
                status: true,
                data: {
                "id": "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                "isVerified": true,
                "fullname": "Jane Doe",
                "email": "sample@gmail.com",
                "phone": "08012345678",
                "userType": "TruckOwner",
                "roleId": null,
                "status": "Suspended",
                "driverStatus": "Online",
                "createdAt": "2025-03-01T15:32:10.929Z",
                "updatedAt": "2025-03-01T17:12:58.113Z"
    },
                message: "Successful message"
              }
            }           
          }
        }
      */
      
      const response = await AdminService.updateUserStatus(req);
      if(!response.status){
        return res.status(400).json(response);
      }
      res.json(response)
    }
    catch(err){
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  }
}

export default UserController
