import { Request, Response } from "express"
import orderService from "../../services/order.service";

const OrderController = {

  createOrder: async (req: Request, res: Response): Promise<any> => {
    try {
      /*
        #swagger.tags = ['Order']
        #swagger.description = 'Endpoint to create order'
        #swagger.requestBody = {
          required: true,
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
                recipientName: "John Doe",
                recipientPhone: "08012345678"
              }
            }
          }
        }
        #swagger.responses[200] = {
          description: "Order created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/orderSchema"
              },
              example: {
                status: true,
                message: "Order created successfully",
                data: {
                  id: "21a9bf20-6db6-485f-ac29-427e14b45312",
                  userId: "ff0c3469-db01-402c-bad8-9ecf48474289",
                  driverId: null,
                  truckId: null,
                  pickupId: "1ab7f032-2af5-4d84-a6e3-2f869b55c70e",
                  deliveryId: "230b61ac-d3db-47f3-acd5-b8a5947e73ec",
                  neededTruckType: "hiab",
                  commodityToDeliver: "coacoa",
                  estimatedWeightOfDelivarables: "400kg",
                  numberOfDeleverable: "20",
                  recipientName: "Adam Lalana",
                  recipientPhone: "+23",
                  status: "Pending",
                  createdAt: "2025-04-14T09:10:42.521Z",
                  updatedAt: "2025-04-14T09:10:42.521Z"
                }
              }
            }
          }
        }
      */
      const response = await orderService.createOrderService(req);
      if (!response.status) {
        return res.status(400).json(response);
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },
  createAddress: async (req: Request, res: Response): Promise<any> => {
    /*
      #swagger.tags = ['Address']
      #swagger.description = 'Endpoint to create address.'
      #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        schema: {
          type: 'string'
        },
        description: 'Bearer token'
      }
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/addressSchema"
            },
            example: {
              pickUpHouseNumber: '23',
              pickupAddress: 'Aswani Road',
              pickUpCity: 'Oshodi',
              pickUpState: 'Ogun',
              deliveryHouseNumber: '13',
              deliveryAddress: 'Agric Ikorodu',
              deliveryCity: 'Oshodi',
              deliveableState: 'Lagos',
              country: 'Nigeria'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: "Address creation response",
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
    try {
      const response = await orderService.createAddress(req);
      if (!response.status) {
        return res.status(400).json(response);
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },
  updateAddress: async (req: Request, res: Response): Promise<any> => {
    /*
      #swagger.tags = ['Address']
      #swagger.description = "Endpoint to update address"
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/addressSchema"
            },
            example: {
              pickUpHouseNumber: "23",
              pickupAddress: "Aswani Road",
              pickUpCity: "Oshodi",
              pickUpState: "Ogun",
              deliveryHouseNumber: "13",
              deliveryAddress: "Agric Ikorodu",
              deliveryCity: "Oshodi",
              deliveableState: "Lagos",
              country: "Nigeria"
            }
          }
        }
      }
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
    try {
      const response = await orderService.updateAddress(req);
      if (!response.status) {
        return res.status(400).json(response);
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },
  getAddresses: async (req: Request, res: Response): Promise<any> => {
    /*
      #swagger.tags = ['Address']
      #swagger.description = "Get all address"
      #swagger.parameters['isPickup'] = {
        in: 'query',
        description: 'Filter to retrieve only pickup addresses. Use true or false.',
        required: false,
        type: 'boolean',
        example: false
      }
      #swagger.responses[200] = {
        description: "Get a single address response",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/addressSchema"
            },
            example: {
              status: true,
              data: [
                {
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
                {
                  id: "2cd8f132-2af5-4d84-a6e3-3f869b55c70f",
                  userId: "ff0c3469-db01-402c-bad8-9ecf48474289",
                  country: "Nigeria",
                  state: "Lagos",
                  city: "Ikorodu",
                  street: "Agric Ikorodu",
                  houseNumber: "13",
                  landmark: null,
                  postalCode: null,
                  status: true,
                  isDefault: false,
                  isPickup: false,
                  createdAt: "2025-04-01T18:22:48.237Z",
                  updatedAt: "2025-04-07T21:50:08.617Z"
                }
              ],
              message: "Address found"
            }
          }
        }
      }
    */
    try {
      const response = await orderService.getAddreses(req);
      if (!response.status) {
        return res.status(400).json(response);
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error`,
        status: false,
      });
    }
  },
  getAddress: async (req: Request, res: Response): Promise<any> => {
    /*
      #swagger.tags = ['Address']
      #swagger.description = "Get one address by ID"
      #swagger.responses[200] = {
        description: "Get a single address response",
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
              message: "Address found"
            }
          }
        }
      }
    */
    try {
      const response = await orderService.getAddress(req);
      if (!response.status) {
        return res.status(400).json(response);
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    }
  },
  deleteAddress: async (req: Request, res: Response): Promise<any> => {
    try {
      /*
        #swagger.tags = ['Address']
        #swagger.description = "Endpoint to delete address"
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'Address ID',
          required: true,
          type: 'string',
          example: '1ab7f032-2af5-4d84-a6e3-2f869b55c70e'
        }
        #swagger.responses[200] = {
          description: "Delete address response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/addressSchema"
              },
              example: {
                status: true,
                message: "Address deleted successfully"
              }
            }
          }
        }
      */
      const response = await orderService.deleteAddress(req);
  
      if (!response.status) {
        return res.status(400).json(response);
      }
  
      return res.json(response);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    }
  }
  
}

export default OrderController;
