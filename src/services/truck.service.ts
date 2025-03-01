import { Request } from "express";
import prismaClient from "../../prisma/prisma";
import { OrderStatus } from "@prisma/client";
// import axios from 'axios';
// import FormData from 'form-data';
// import fs from 'fs';
// import { Prisma } from "@prisma/client";

const truckService = {

  getDashboardService: async (req: Request) => {
  
    // Await the result for truck count
    const truckCount = await prismaClient.truck.count({ where: { ownerId: req.user.id } });

    // Await the result for trucks that are "on-transit"
    const onTransitCount = (await prismaClient.truck.findMany({
        where: { ownerId: req.user.id, status: "In_Transit" },
    })).length;


    // Await the count for order that are "completed"
    const completedJobCount = await prismaClient.order.count({
      where: {
        status: "Completed",
        truck: {
          ownerId: req.user.id,
        },
      },
    });

        // Await the result for order that are "completed"
        const completedJob = await prismaClient.order.findMany({
          where: {
            status: "Completed",
            truck: {
              ownerId: req.user.id
            },
          },
        });

    return {
      status: true,
      data: {
        totalTrucks: truckCount,
        onTransitTrucks: onTransitCount,
        completedTrips: completedJobCount,
        completedJob
      },
    };
  },

  getTrucks: async (req: Request): Promise<any> => {
    const { status } = req.query;
  
    const whereCondition: any = {
      ownerId: req.user.id, // Always filter by ownerId
    };
    if (status) {
      whereCondition.status = status; // Add status filter if it's provided
    }
  
    const allOwnerTrucks = await prismaClient.truck.findMany({
      where: whereCondition,
      include: {
        driver: {
          select: {
            fullname: true
          }
        }
      }
    });
  
    return { status: true, data: allOwnerTrucks };
  },

  createTruck: async (req: Request): Promise<any> => {
    const { licensePlate, truckCapacity, truckType, registrationPapers } = req.body;
    const { id } = req.user;

    // Create the truck entry in the database
    const createdTruck = await prismaClient.truck.create({
      data: {
        plateNumber: licensePlate,
        capacity: truckCapacity,
        type: truckType,
        createdById: id,
        ownerId: id, // Default to user ID if no owner is provided
        registrationPapers,
        locationId: null
      }
    });
    return { status: true, data: createdTruck };
  },

  updateTruck: async (req: Request): Promise<any> => {
    try {

      const { licensePlate, truckCapacity, truckType, ownerId, registrationPapers } = req.body;
      const { truckId } = req.params;
  
      if (!truckId || !licensePlate || !truckCapacity || !truckType) {
        return { status: false, message: 'Invalid input data' };
      }
  
      const existingTruck = await prismaClient.truck.findUnique({
        where: { id: truckId },
      });
  
      if (!existingTruck) {
        return { status: false, message: 'Truck not found' };
      }
  
      // const oldRegistrationPapers = existingTruck.registrationPapers || [];
  
      // if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      //   for (const file of req.files as Express.Multer.File[]) {
      //     const formData = new FormData();
      //     formData.append('file', file.buffer, {
      //       filename: file.originalname,
      //       contentType: file.mimetype,
      //     });
  
      //     const response = await axios.post(process.env.STORAGE_UPLOAD_URL!, formData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //         ...formData.getHeaders(),
      //       },
      //     });
  
      //     if (response.data && response.data.data.url) {
      //       const { url, key } = response.data.data;
      //       uploadedUrls.push({ url, key });
      //     } else {
      //       throw new Error('Image upload failed');
      //     }
      //   }
      // }
  
      // if (oldRegistrationPapers.length > 0 && uploadedUrls.length > 0) {
      //   console.log("Old Registration Papers:", oldRegistrationPapers);
      //   console.log("Storage Base URL:", process.env.STORAGE_UPLOAD_URL);
      
      //   await Promise.all(oldRegistrationPapers.map(async (oldFile: any) => {
      //     try {
      //       const deleteUrl = `${process.env.STORAGE_UPLOAD_URL!}/${oldFile.key}`;
      //       console.log("Constructed delete URL:", deleteUrl);
      
      //       await axios.delete(deleteUrl);
      //     } catch (error: any) {
      //       if (error?.response?.status  === 404) {
      //         console.warn(`File not found for deletion: ${oldFile.key}`);
      //       } else {
      //         console.error('Failed to delete old registration paper:', error);
      //       }
      //     }
      //   }));
      // }
      
      const updatedTruck = await prismaClient.truck.update({
        where: { id: truckId },
        data: {
          plateNumber: licensePlate,
          capacity: truckCapacity,
          type: truckType,
          ownerId: ownerId || req.user.id,
          registrationPapers: registrationPapers
        },
      });
  
      return { status: true, data: updatedTruck };
    } catch (error) {
      console.error(error);
      return { status: false, message: 'Failed to update truck', error };
    }
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
    if (truck.ownerId !== id) {
      return {
        message: "You do not have permission to update this truck",
        status: false,
      };
    }
    // truck.registrationPapers.forEach(async (val : any)=>{
    //   console.log(val);
    //   const v = await axios.delete(`${process.env.STORAGE_UPLOAD_URL!}/${val.key}`)
    //   // console.log(v);
    // })
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

    if (fountTruck.createdById !== id && fountTruck.ownerId !== id) {
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
      underMaintenanceCount: 0,
    };
  
    truckStatusCounts.forEach(({ status, _count }) => {
      switch (status) {
        case "In_Active":
          report.suspendedCount = _count.status;
          break;
        case "Active":
          report.availableCount = _count.status;
          break;
        case "In_Transit":
          report.onTransitCount = _count.status;
          break;
        case "Under_Maintenance":
          report.underMaintenanceCount = _count.status;
          break;
      }
    });
  
    return { status: true, data: report };
  },

  getCompletedJobs: async (req: Request): Promise<any> =>{

    const {status} = req.query;
    const completedJob = await prismaClient.order.findMany(
      {
        where: {
          status: status  as OrderStatus
        }
      }
    )
    return {status: true, data: completedJob}
  }
}


export default truckService;