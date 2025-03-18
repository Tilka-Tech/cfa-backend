import { Request } from "express"
import prisma from "../../../prisma/prisma";
import { Prisma, TruckStatus } from "@prisma/client";

const TruckService = {
 
  getTrucks: async (req: Request)=>{
    const { status, search, pageNumber, pageSize } = req.query;
    const where: Prisma.TruckWhereInput = {}

    // Validate and set `status`
    if (status && Object.values(TruckStatus).includes(status as TruckStatus)) {
      where.status = status as TruckStatus;
  }

   // Add fuzzy search for `name` or `model`
   if (search) {
    where.OR = [
      { type: { contains: search as string, mode: "insensitive" } },
      { plateNumber: { contains: search as string, mode: "insensitive" } }
    ];
  }

  let take, skip
  if(pageNumber && pageSize){
    skip = (Number(pageNumber) - 1) * Number(pageSize)
    take = Number(pageSize)
  }

    // get all trucks with or without status
    const data = await prisma.truck.findMany({
      where,
      take,
      skip
    })

    const count = await prisma.truck.count({ where });


    return {
      message: "Trucks retrieved",
      status: true,
      data,
      count
     }
  },

  getOneTruck: async (req: Request)=>{
    const truckId = req.params.id
    // get one truck
    const data = await prisma.truck.findUnique({
      where: {id: truckId}
    })

    return {
      message: "Truck retrieved",
      status: true,
      data
     }
  },
  updateTruckStatus: async (req: Request)=>{
    const truckId = req.params.id
    const {status} = req.body
    const foundTruck = await prisma.truck.findUnique({
      where: {id: truckId}})
    if(!foundTruck){
      return {status: false, message: "Truck not found"}
    }

    if (status === TruckStatus.Unverified) {
      return { status: false, message: "Transition to 'Unverified' is not allowed" };
    }

    if (![ "In_Transit",
      "Under_Maintenance",
      "Active",
      "In_Active"].includes(status)) {
      return { status: false, message: "Invalid status" };
    }

    if(foundTruck.status === status){
      return {status: false, message: `Truck status is already ${status}`}
    }

    // if truck status is in transit you cannot transition to under maintenance or In_active

    // update truck status
    const data = await prisma.truck.update({
      where: {id: truckId},
      data: {
        status
      }
    })

    return {
      message: "Truck status updated",
      status: true,
      data
     }
  }
}

export default TruckService