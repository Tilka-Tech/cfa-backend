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
    }

}

export default OrderController;
