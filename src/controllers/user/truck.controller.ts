import { Request, response, Response } from "express"
import truckService from "../../services/truck.service";

const TruckController = {
  getTrucks: async (req : Request, res: Response): Promise<any>=>{
    try{
      /* 
        #swagger.tags = ['Users']
        #swagger.description = 'Get users trucks'
        #swagger.parameters['status'] = {
          in: 'query',
          name: 'status',
          description: 'Fetch trucks by status',
          required: false,
          schema: {
            type: 'string',
            enum: ['Acive', 'In_Transit', 'Under_Maintenance', 'In_Active']
          }
        }
      */

      const response = await truckService.getTrucks(req);

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
                      status: "Active",
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
                      status: "Active",
                      ownerId: "c48929ba-212e-4aff-8624-ef694ef4216d",
                      createdById: "c48929ba-212e-4aff-8624-ef694ef4216d",
                      driverId: null,
                      createdAt: "2025-02-06T13:00:59.415Z",
                      updatedAt: "2025-02-06T13:00:59.415Z"
                    }
                        ],
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

  createTruck: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Users']
         #swagger.description = Create new truck by truck owner
         #swagger.requestBody = {
           required: true,
           content: {
             "application/json": {
               schema: {
                 $ref: "#/components/schemas/truckRegistrationSchema"
               },
               example: {
                licensePlate: "12132432425",
                   truckCapacity: "2500 tone",
                  truckType: "ferrari",
                  registrationPapers: [
                   {
                      "url": "https://res.cloudinary.com/dnaj0avcy/image/upload/v1738577300/zlhzrwg420rw9y464px7.png",
                      "key": "zlhzrwg420rw9y464px7"
                    }
                  ]
               }
             }
           }
         } 
       */
      const response = await truckService.createTruck(req);

    /* #swagger.responses[200] = {
      description: "create truck response",
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
                      status: "Unverified",
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

  updateTruck: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Users']
        #swagger.description = Update truck details
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/truckRegistrationSchema"
              },
              example: {
                licensePlate: "12132432425",
                   truckCapacity: "2500 tone",
                  truckType: "ferrari",
                  registrationPapers: [
                   {
                      "url": "https://res.cloudinary.com/dnaj0avcy/image/upload/v1738577300/zlhzrwg420rw9y464px7.png",
                      "key": "zlhzrwg420rw9y464px7"
                    }
                  ]
               }
            }
          }
        } 
      */
      const response = await truckService.updateTruck(req);

    /* #swagger.responses[200] = {
      description: "Truck response",
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
                      status: "Active",
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

  deleteTruck: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Users']
        #swagger.description = Delete truck
      */
      const response = await truckService.deleteTruck(req);

    /* #swagger.responses[200] = {
      description: "deleted by id",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/truckRegistrationSchema"
            },
            example: {
                   status: true,
                    data: "deleted",
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

  getTruckById: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Users']
        #swagger.description = Get truck by id
      */
      const response = await truckService.getTruckById(req);

    /* #swagger.responses[200] = {
      description: "get by id",
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
                      status: "Active",
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

  getTruckStatusReport: async (req : Request, res: Response): Promise<any>=>{
    try{
      /*
        #swagger.tags= ['Users']
        #swagger.description = Get truck status report
      */
      const response = await truckService.getTruckStatusReport(req);

    /* #swagger.responses[200] = {
      description: "Truck report response",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/truckRegistrationSchema"
            },
            example: {
              status: true,
              data: {
                suspendedCount: 0,
                availableCount: 2,
                onTransitCount: 0,
                underMaintenanceCount: 0
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

  getCompletedJobs: async (req: Request, res: Response): Promise<any> =>{
    try{
      /*
        #swagger.tags= ['Users']
        #swagger.description = 'Get users trucks'
        #swagger.parameters['status'] = {
          in: 'query',
          name: 'status',
          description: 'Fetch completed trip by status',
          required: false,
          schema: {
            type: 'string',
            enum: ['Completed']
          }
        }
      */

        const response = await truckService.getCompletedJobs(req);

        /* #swagger.responses[200] = {
      description: "completed job",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/truckRegistrationSchema"
            },
            example: {
              status: true,
              data: [
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
                      status: "Completed",
                      ownerId: "c48929ba-212e-4aff-8624-ef694ef4216d",
                      createdById: "c48929ba-212e-4aff-8624-ef694ef4216d",
                      driverId: null,
                      createdAt: "2025-02-06T13:00:59.415Z",
                      updatedAt: "2025-02-06T13:00:59.415Z"
                    }
              ],
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


export default TruckController