import { Request } from "express";
import prismaClient from "../../prisma/prisma";
import { date } from "joi";

const truckService = {
    getTrucks: async (req : Request): Promise<any>=>{

        return {status: true, data: 1}
    },
    createTruck: async (req : Request)=>{
        const {registrationPaper, licensePlate, truckCapacity, truckType, ownerId} = req.body;
        const id = req.user;
        const registrationPapers = req.files
        console.log(registrationPapers);
        console.log("id bbbbb", id);

        // const createdTruck = await prismaClient.truck.create({
        //     data:{
        //         plateNumber: licensePlate,
        //         capacity: truckCapacity,
        //         type: truckType,
        //         creatorId: id,
        //         ...{ownerId: ownerId ? ownerId : id},
        //         registrationPapers:{
        //             create: {
        //                 paperUrl: registrationPaper
        //             }
        //         }
            
        //     }
        // })

        return {status: true, data: 1}
    },
    updateTruckStatus: async (req : Request)=>{

        return {status: true, data: 1}
    }
}


export default truckService;