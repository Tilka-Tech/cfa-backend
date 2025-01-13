import { Request } from "express";
import prismaClient from "../../prisma/prisma";

const truckService = {
    getTrucks: async (req: Request): Promise<any> => {
        const { status } = req.query;
        console.log("status", status);
      
        const whereCondition: any = {
          ownerId: req.user.id, // Always filter by ownerId
        };
      
        if (status) {
          whereCondition.status = status; // Add status filter if it's provided
        }
      
        const allOwnerTrucks = await prismaClient.truck.findMany({
          where: whereCondition,
        });
      
        return { status: true, data: allOwnerTrucks };
      },
    createTruck: async (req : Request): Promise<any>=>{
        const {licensePlate, truckCapacity, truckType, ownerId} = req.body;
        const {id }= req.user;
        const registrationPapers = req.files
        if(!registrationPapers || !Array.isArray(registrationPapers) || registrationPapers.length === 0){
            return {
                message: "\"registrationPapers\" is required and must be an array of images",
                status: false
            }
        }

        const createdTruck = await prismaClient.truck.create({
            data:{
                plateNumber: licensePlate,
                capacity: truckCapacity,
                type: truckType,
                creatorId: id,
                ...{ownerId: ownerId || id},
                registrationPapers:{
                    create: registrationPapers.map(file=> ({paperUrl: file.path, }))
                }
            }
        })

        return {status: true, data: createdTruck}
    },
    updateTruck: async (req: Request): Promise<any> => {
        const { truckId } = req.params;
        const { licensePlate, truckCapacity, truckType, ownerId } = req.body;
        const { id } = req.user;
        const registrationPapers = req.files;
    console.log(registrationPapers);
        // Check if registration papers are provided and valid
        if (!registrationPapers || !Array.isArray(registrationPapers) || registrationPapers.length === 0) {
            return {
                message: '"registrationPapers" is required and must be an array of images',
                status: false,
            };
        }
    
        // Ensure the user is either the creator or the owner
        const truck = await prismaClient.truck.findUnique({
            where: { id: truckId },
        });
    
        if (!truck) {
            return {
                message: "Truck not found",
                status: false,
            };
        }
    
        if (truck.creatorId !== id && truck.ownerId !== ownerId) {
            return {
                message: "You do not have permission to update this truck",
                status: false,
            };
        }
    
        // Update the truck with new details
        const updatedTruck = await prismaClient.truck.update({
            where: { id: truckId },
            data: {
                // plateNumber: licensePlate,
                capacity: truckCapacity,
                type: truckType,
                creatorId: id,
                ownerId: ownerId || truck.ownerId, // Use existing owner if not provided
                registrationPapers: {
                    create: registrationPapers.map((file) => ({
                        paperUrl: file.path,
                    })),
                },
            },
        });
    
        return { status: true, data: updatedTruck };
    },
    
    deleteTruck: async(req: Request): Promise<any> =>{
        const {truckId} = req.params;
        const {id} = req.user;
            // Ensure the user is either the creator or the owner
            const truck = await prismaClient.truck.findUnique({
                where: { id: truckId },
            });
            if (!truck) {
                return {
                    message: "Truck not found",
                    status: false,
                };
            }
            if (truck.creatorId !== id && truck.ownerId !== id) {
                return {
                    message: "You do not have permission to update this truck",
                    status: false,
                };
            }

            await prismaClient.truck.delete({where:{id: truckId}});
        return {status: true, data: "deleted"}
    },
    getTruckById: async (req : Request): Promise<any>=>{
        const {truckId} = req.params;
        const {id} = req.user;
        const fountTruck = await prismaClient.truck.findUnique({
            where: { id: truckId },
        });
    
        if (!fountTruck) {
            return {
                message: "Truck not found",
                status: false,
            };
        }
    
        if (fountTruck.creatorId !== id && fountTruck.ownerId !== id) {
            return {
                message: "You do not have permission to update this truck",
                status: false,
            };
        }
        return {status: true, data: fountTruck}
    },
    getTruckStatusReport: async (req: Request): Promise<any> => {
        const { id } = req.user;
      
        const truckStatusCounts = await prismaClient.truck.groupBy({
          by: ['status'],
          where: { ownerId: id },
          _count: { status: true },
        });
        const report = {
          suspendedCount: 0,
          availableCount: 0,
          onTransitCount: 0,
          underRepairCount: 0,
        };
      
        truckStatusCounts.forEach(({ status, _count }) => {
          switch (status) {
            case 'suspended':
              report.suspendedCount = _count.status;
              break;
            case 'available':
              report.availableCount = _count.status;
              break;
            case 'on-transit':
              report.onTransitCount = _count.status;
              break;
            case 'under-repair':
              report.underRepairCount = _count.status;
              break;
          }
        });
      
        return { status: true, data: report };
      }
}


export default truckService;