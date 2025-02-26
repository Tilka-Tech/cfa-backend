import { Request } from "express"
import prismaClient from "../../prisma/prisma";

const orderService = {
    createOrderService: async(req: Request): Promise<any>=>{
        try {
            const {neededTruckType, commodityToDeliver, estimatedWeightOfDelivarables, numberOfDeleverable, pickUpHouseNumber, pickupAddress, pickUpCity,pickUpState, deliveryHouseNumber, deliveryAddress, deliveryCity, deliveableState, country, recipientName, recipientPhone} = req.body;

            const {id: userId} = req.user

            const pickupAddres = await prismaClient.userAddress.create({
                data: {
                    country,
                    state: pickUpState,
                    houseNumber: pickUpHouseNumber,
                    city: pickUpCity,
                    street: pickupAddress,
                    isDefault: true,
                    status: true,
                    userId
                }
            });

            const deliveryAdd = await prismaClient.userAddress.create({
                data: {
                    country,
                    state: deliveableState,
                    houseNumber: deliveryHouseNumber,
                    city: deliveryCity,
                    street: deliveryAddress,
                    isDefault: true,
                    status: true,
                    userId
                }
            });


            const createdOrder = await prismaClient.order.create({
                data: {
                    neededTruckType,
                    commodityToDeliver,
                    estimatedWeightOfDelivarables,
                    numberOfDeleverable,
                    pickupId: pickupAddres.id,
                    deliveryId: deliveryAdd.id,
                    status: "Pending",
                    recipientName,
                    recipientPhone,
                    userId
                }
            })

            return {status: true, data: createdOrder}
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

export default orderService;
