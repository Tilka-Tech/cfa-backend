import { Request, Response } from "express";
import TruckService from "../../services/admin/truck.service";


const TruckController = {
  getTrucks: async (req: Request, res: Response ): Promise<any> =>{
    try{
      /* 
        #swagger.tags = ['Admin']
        #swagger.description = Get List of trucks
        #swagger.parameters['status'] = {
          in: 'query',
          name: 'status',
          description: 'Fetch trucks by status',
          required: false,
          schema: {
            type: 'string',
            enum: ['Active', 'In_Transit', 'Under_Maintenance', 'In_Active', 'Unverified']
          }
        }
      */
      const response = await TruckService.getTrucks(req);

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
        #swagger.description = get single truck by id 
      */
      const response = await TruckService.getOneTruck(req);

    /* #swagger.responses[200] = {
      description: "single truck response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/truckRegistrationSchema"
            },
            example: {
              status: true,
              data: {
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
        #swagger.description = Update truck status
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
                data:  {
                  capacity: "2500 tone",
                  type: "bugati",
                  registrationPapers: [
                      {
                          "key": "zlhzrwg420rw9y464px7",
                          "url": "https://res.cloudinary.com/dnaj0avcy/image/upload/v1738577300/zlhzrwg420rw9y464px7.png"
                      }
                  ],
                  id: "e03171ee-c958-422b-b476-8af181965f3e",
                  plateNumber: "12132432424",
                  status: "Unverified",
                  ownerId: "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                  createdById: "c81153a0-4e95-40b4-a320-1d0acf8c3e70",
                  driverId: null,
                  locationId: null,
                  createdAt: "2025-03-01T19:08:37.952Z",
                  updatedAt: "2025-03-01T19:08:37.952Z"
                },
                message: "Successful message"
              }
            }           
          }
        }
      */
      
      const response = await TruckService.updateTruckStatus(req);
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

export default TruckController
