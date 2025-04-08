import { Request } from "express"
import prismaClient from "../../prisma/prisma";

const orderService = {
    createOrderService: async(req: Request): Promise<any>=>{
        try {
            const {
                neededTruckType,
                commodityToDeliver,
                estimatedWeightOfDelivarables,
                numberOfDeleverable,
                pickupId,
                deliveryId,
                // pickUpHouseNumber,
                // pickupAddress,
                // pickUpCity,
                // pickUpState,
                // deliveryHouseNumber,
                // deliveryAddress,
                // deliveryCity,
                // deliveableState,
                // country,
                recipientName,
                recipientPhone
            } = req.body;

            const {id: userId} = req.user
            if(!pickupId && !deliveryId) return {
                status: false,
                message: "select a pickup or delivery address"
            }
            const createdOrder = await prismaClient.order.create({
                data: {
                    neededTruckType,
                    commodityToDeliver,
                    estimatedWeightOfDelivarables,
                    numberOfDeleverable,
                    pickupId,
                    deliveryId,
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
    },
    createAddress: async (req: Request): Promise<any> => {
        try {
            const {
                pickUpHouseNumber,
                pickupAddress,
                pickUpCity,
                pickUpState,
                deliveryHouseNumber,
                deliveryAddress,
                deliveryCity,
                deliveableState,
                country
            } = req.body;
    
            const { id } = req.user;

        // Check if user already has a pickup address
        const existingPickup = await prismaClient.userAddress.findFirst({
            where: { userId: id, isPickup: true },
        });

        // Check if user already has a delivery address
        const existingDelivery = await prismaClient.userAddress.findFirst({
            where: { userId: id, isPickup: false },
        });
    
    
            let pickup, delivery;
    
            if (pickUpState && pickUpCity && pickUpHouseNumber && pickupAddress) {
                pickup = await prismaClient.userAddress.create({
                    data: {
                        country,
                        state: pickUpState,
                        houseNumber: pickUpHouseNumber,
                        city: pickUpCity,
                        street: pickupAddress,
                        isDefault: !existingPickup, // Set true if first address, false otherwise
                        status: true,
                        userId: id
                    }
                });
            }

            if (deliveableState && deliveryCity && deliveryHouseNumber && deliveryAddress) {
                delivery = await prismaClient.userAddress.create({
                    data: {
                        country,
                        state: deliveableState,
                        houseNumber: deliveryHouseNumber,
                        city: deliveryCity,
                        street: deliveryAddress,
                        isDefault: !existingDelivery, // Set true if first address, false otherwise
                        status: true,
                        userId: id,
                        isPickup: false
                    }
                });
            }
    
            if (!delivery && !pickup) {
                return {
                    status: false,
                    message: "Either delivery address or pickup address is required"
                };
            }
    
            return {
                status: true,
                message: "Address created successfully"
            };
    
        } catch (err: any) {
            console.log(err);
            if (err.name === "PrismaClientKnownRequestError") {
                return {
                    status: false,
                    message: "You already have this address"
                };
            }
            return err;
        }
    },
    updateAddress: async(req: Request): Promise<any>=>{
        try {
            const {
                pickUpHouseNumber,
                pickupAddress,
                pickUpCity,
                pickUpState,
                deliveryHouseNumber,
                deliveryAddress,
                deliveryCity,
                deliveableState,
                country,
                isDefault
            } = req.body;
            const {id} = req.user;
            const {id: addressId} = req.params;
            // Find address and verify ownership
            const foundAddress = await prismaClient.userAddress.findFirst({
                where: {
                    id: addressId,
                    userId: id
                }
            });
    
            if (!foundAddress) {
                return {
                    status: false,
                    message: "Address not found"
                };
            }
    
            const updateData: any = {};
    
            // Handle setting default address
            if (isDefault !== undefined && isDefault !== null) {
                if (Boolean(isDefault) === true) {
                    // Use transaction to update all related addresses
                    await prismaClient.$transaction(async (tx) => {
                        // Reset other addresses of same type (pickup/delivery)
                        await tx.userAddress.updateMany({
                            where: {
                                userId: id,
                                isPickup: foundAddress.isPickup, // Match same type
                                isDefault: true,
                                id: { not: addressId } // Exclude current address
                            },
                            data: { isDefault: false }
                        });
                    });
                }
                updateData.isDefault = Boolean(isDefault);
            }
    
            // Add other fields if provided
            if (country !== undefined && country !== null) updateData.country = country;
            
            if (foundAddress.isPickup) {
                if (pickUpState) updateData.state = pickUpState;
                if (pickUpHouseNumber) updateData.houseNumber = pickUpHouseNumber;
                if (pickUpCity) updateData.city = pickUpCity;
                if (pickupAddress) updateData.street = pickupAddress;
            } else {
                if (deliveableState) updateData.state = deliveableState;
                if (deliveryHouseNumber) updateData.houseNumber = deliveryHouseNumber;
                if (deliveryCity) updateData.city = deliveryCity;
                if (deliveryAddress) updateData.street = deliveryAddress;
            }
    
            const updatedAddress = await prismaClient.userAddress.update({
                where: { id: addressId },
                data: updateData
            });
    
            return {
                status: true,
                message: `${foundAddress.isPickup ? 'Pickup' : 'Delivery'} address updated successfully`,
                data: updatedAddress
            };
        } catch(err) {
            console.log(err);
            return {
                status: false,
                message: "Error updating address",
                error: err
            };
        }
    },
    getAddreses: async(req: Request): Promise<any> =>{
        try{
            const {id} = req.user;
            const {isPickup} = req.query
            // Construct dynamic filter
            const where: any = { userId: id };
     if (isPickup !== undefined) {
         console.log(isPickup);
         where.isPickup = isPickup === 'true'; // Convert to boolean
     }
     const foundAddresses = await prismaClient.userAddress.findMany({
         where
     });
            if(foundAddresses.length === 0)
                return {
                    status: true,
                    message: 'no address found',
                    data: []
                }

            return {
                status: true,
                message: "address found",
                data: foundAddresses
            }
        }catch(err){
            console.log(err);
            return err
        }
    },
    getAddress: async(req: Request): Promise<any> =>{
        try{
            const {id} = req.user;
            const {id: addressId} = req.params
            console.log("hhahhahahhahhahah");
            const foundAddresses = await prismaClient.userAddress.findMany({
         where: { userId: id, id: addressId }
     });
            if(foundAddresses.length === 0)
                return {
                    status: true,
                    message: 'no address found',
                    data: []
                }

            return {
                status: true,
                message: "address found",
                data: foundAddresses
            }
        }catch(err){
            console.log(err);
            return err
        }
    },
    deleteAddress: async(req: Request): Promise<any> =>{
        try{
            const {id} = req.user;
            const {id: addressId} = req.params
            console.log("delee");

            const deleted = await prismaClient.userAddress.deleteMany({
                where: {
                    id: addressId,
                    userId: id
                }
            });
    
            if (deleted.count === 0) {
                return {
                    status: false,
                    message: "Address not found or unauthorized",
                };
            }

            return {
                status: true,
                message: "Address deleted"
            }
        }catch(err){
            console.log(err);
            return err
        }
    }
}

export default orderService;
