import { Request, Response } from "express";
import AdminService from "../../services/admin/admin.service";


const TruckController = {
  getTrucks: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /* 
        #swagger.tags = ['Admin']
        #swagger.description = 'Get List of trucks'
        #swagger.parameters['status'] = {
          in: 'query',
          name: 'status',
          description: 'Fetch trucks by status',
          required: false,
          schema: {
            type: 'string',
            enum: ['Available', 'In_Transit', 'Under_Maintenance', 'Removed']
          }
        }
      */
      const response = await AdminService.getUsers(req);

   /* #swagger.responses[200] = {
      description: "get all trucks",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/truckRegistrationSchema"
            },
            example: {
              status: true,
              data:  [
                      {
                capacity: "2500 tone",
                  type: "ferrari",
                  registrationPapers: [
                        {
                          "key": "zlhzrwg420rw9y464px7",
                          "url": "https://res.cloudinary.com/dnaj0avcy/image/upload/v1738577300/zlhzrwg420rw9y464px7.png"
                        }
                      ],
                      id: "62d5eaad-ce6a-4429-bc8d-8d1aae850de7",
                      plateNumber: "12132432425",
                      status: "Available",
                      ownerId: "c48929ba-212e-4aff-8624-ef694ef4216d",
                      createdById: "c48929ba-212e-4aff-8624-ef694ef4216d",
                      driverId: null,
                      createdAt: "2025-02-06T13:00:59.415Z",
                      updatedAt: "2025-02-06T13:00:59.415Z"
                    },
                          {
                capacity: "2500 tone",
                  type: "ferrari",
                  registrationPapers: [
                        {
                          "key": "zlhzrwg420rw9y464px7",
                          "url": "https://res.cloudinary.com/dnaj0avcy/image/upload/v1738577300/zlhzrwg420rw9y464px7.png"
                        }
                      ],
                      id: "62d5eaad-ce6a-4429-bc8d-8d1aae850de7",
                      plateNumber: "12132432425",
                      status: "Available",
                      ownerId: "c48929ba-212e-4aff-8624-ef694ef4216d",
                      createdById: "c48929ba-212e-4aff-8624-ef694ef4216d",
                      driverId: null,
                      createdAt: "2025-02-06T13:00:59.415Z",
                      updatedAt: "2025-02-06T13:00:59.415Z"
                    }
                        ],
              message: "Successful message",
              count: 0
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

  getOneTruck: async (req: Request, res: Response ): Promise<any> =>{
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

  updateTruckStatus: async (req: Request, res: Response ): Promise<any> =>{
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

}

export default TruckController
