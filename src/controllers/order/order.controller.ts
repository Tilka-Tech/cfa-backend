import { Request, Response } from "express"
import orderService from "../../services/order.service";

const OrderController = {

    createOrder: async(req: Request, res: Response): Promise<any>=>{
        try {

            /*
            #swagger.tags = ['Users']
            #swagger.description = Endpoint to create order,
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/orderSchema"
                        }
                    }
                },
                example: {
                    neededTruckType: "Flatbed",
                    commodityToDeliver: "Cement",
                    estimatedWeightOfDelivarables: "2000",
                    numberOfDeleverable: "1000",
                    pickUpHouseNumber: "12",
                    pickupAddress: "Ojuelegba",
                    pickUpCity: "Lagos",
                    pickUpState: "Lagos",
                    deliveryHouseNumber: "12",
                    deliveryAddress: "Ojuelegba",
                    deliveryCity: "Lagos",
                    deliveableState: "Lagos",
                    country: "Nigeria",
                    recipientName: "John Doe",
                    recipientPhone: "08012345678"
                }
            }
            */

            const response = await orderService.createOrderService(req);
            /*
            #swagger.tags = ['Users']
            #swagger.description = Endpoint to create order,
             content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/orderSchema"
                    },
                    example: {
                        neededTruckType: "Flatbed",
                        commodityToDeliver: "Cement",
                        estimatedWeightOfDelivarables: "2000",
                        numberOfDeleverable: "1000",
                        pickUpHouseNumber: "12",
                        pickupAddress: "Ojuelegba",
                        pickUpCity: "Lagos",
                        pickUpState: "Lagos",
                        deliveryHouseNumber: "12",
                        deliveryAddress: "Ojuelegba",
                        deliveryCity: "Lagos",
                        deliveableState: "Lagos",
                        country: "Nigeria",
                        recipientName: "John Doe",
                        recipientPhone: "08012345678"
                    },
            message: "Order created successfully"
                }
            }
            */

            if(!response.status){
                return res.status(400).json(response);
              }
              res.json(response)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: `Internal Server Error`,
                status: false,
            });
        }
    },
    createAddress: async(req: Request, res: Response): Promise<any>=>{
        try {

            /*
            #swagger.tags = ['Address']
            #swagger.description = "Endpoint to create address",
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addressSchema"
                        }
                    }
                },
                example: {
                    pickUpHouseNumber:"23",
                    pickupAddress:"Aswani Road",
                    pickUpCity:"Oshodi",
                    pickUpState:"Ogun",
                    deliveryHouseNumber:"13",
                    deliveryAddress:"Agric Ikorodu",
                    deliveryCity:"Oshodi",
                    deliveableState""Lagos",
                    country:"Nigeria"
                }
            }
            */

            const response = await orderService.createAddress(req);
            /*
            #swagger.responses[200] = {
            description: "address creation response",
            content: {
                "application/json": {
                schema: {
                    $ref: "#/components/schemas/addressSchema"
                },
                example: {
                    status: true,
                    message: "Address created successfully"
                }
                }
            }
            }
            */
            if(!response.status){
                return res.status(400).json(response);
              }
              res.json(response)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: `Internal Server Error`,
                status: false,
            });
        }
    },
    updateAddress: async(req: Request, res: Response): Promise<any>=>{
        try {

             /*
            #swagger.tags = ['Address']
            #swagger.description = "Endpoint to create address",
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addressSchema"
                        }
                    }
                },
                example: {
                    pickUpHouseNumber:"23",
                    pickupAddress:"Aswani Road",
                    pickUpCity:"Oshodi",
                    pickUpState:"Ogun",
                    deliveryHouseNumber:"13",
                    deliveryAddress:"Agric Ikorodu",
                    deliveryCity:"Oshodi",
                    deliveableState""Lagos",
                    country:"Nigeria"
                }
            }
            */
            const response = await orderService.updateAddress(req);
            /*
            #swagger.responses[200] = {
            description: "Pickup address updated successfully",
            content: {
                "application/json": {
                schema: {
                    $ref: "#/components/schemas/addressSchema"
                },
                example: {
                    status: true,
                    data: {
                        id: "1ab7f032-2af5-4d84-a6e3-2f869b55c70e",
                        userId: "ff0c3469-db01-402c-bad8-9ecf48474289",
                        country: "Nigeria",
                        state: "Ogun",
                        city: "Oshodi",
                        street: "Aswani Road",
                        houseNumber: "27",
                        landmark: null,
                        postalCode: null,
                        status: true,
                        isDefault: true,
                        isPickup: true,
                        createdAt: "2025-04-01T18:22:48.237Z",
                        updatedAt: "2025-04-07T21:50:08.617Z"
                    },
                    message: "Pickup address updated successfully"
                  }
                }
            }
            }
            */


            if(!response.status){
                return res.status(400).json(response);
              }
              res.json(response)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: `Internal Server Error`,
                status: false,
            });
        }
    },
    getAddreses: async(req: Request, res: Response): Promise<any>=>{
        try{
            /*
                #swagger.tags= ['Address']
                #swagger.description = Get one address by id
            */
            const response = await orderService.getAddreses(req);
      
 /* #swagger.responses[200] = {
            description: "Get a single address response",
              content: {
                "application/json": {
                  schema:{
                    $ref: "#/components/schemas/addressSchema"
                  },
                  example: {
                    status: true,
                    data:[{
                        "id": "1ab7f032-2af5-4d84-a6e3-2f869b55c70e",
                        "userId": "ff0c3469-db01-402c-bad8-9ecf48474289",
                        "country": "Nigeria",
                        "state": "Ogun",
                        "city": "Oshodi",
                        "street": "Aswani Road",
                        "houseNumber": "27",
                        "landmark": null,
                        "postalCode": null,
                        "status": true,
                        "isDefault": true,
                        "isPickup": true,
                        "createdAt": "2025-04-01T18:22:48.237Z",
                        "updatedAt": "2025-04-07T21:50:08.617Z"
                    },
                    {
                        "id": "1ab7f032-2af5-4d84-a6e3-2f869b55c70e",
                        "userId": "ff0c3469-db01-402c-bad8-9ecf48474289",
                        "country": "Nigeria",
                        "state": "Ogun",
                        "city": "Oshodi",
                        "street": "Aswani Road",
                        "houseNumber": "27",
                        "landmark": null,
                        "postalCode": null,
                        "status": true,
                        "isDefault": true,
                        "isPickup": true,
                        "createdAt": "2025-04-01T18:22:48.237Z",
                        "updatedAt": "2025-04-07T21:50:08.617Z"
                    }
                    ],
                    message: "address found"
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
    getAddress: async(req: Request, res: Response): Promise<any>=>{
        try{
            /*
                #swagger.tags= ['Address']
                #swagger.description = Get one address by id
            */
            const response = await orderService.getAddress(req);
      
          /* #swagger.responses[200] = {
            description: "Get a single address response",
              content: {
                "application/json": {
                  schema:{
                    $ref: "#/components/schemas/addressSchema"
                  },
                  example: {
                    status: true,
                    data: {
                        "id": "1ab7f032-2af5-4d84-a6e3-2f869b55c70e",
                        "userId": "ff0c3469-db01-402c-bad8-9ecf48474289",
                        "country": "Nigeria",
                        "state": "Ogun",
                        "city": "Oshodi",
                        "street": "Aswani Road",
                        "houseNumber": "27",
                        "landmark": null,
                        "postalCode": null,
                        "status": true,
                        "isDefault": true,
                        "isPickup": true,
                        "createdAt": "2025-04-01T18:22:48.237Z",
                        "updatedAt": "2025-04-07T21:50:08.617Z"
                    },
                    message: "address found"
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

export default OrderController;
