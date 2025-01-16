import { Request } from "express";
import prismaClient from "../../prisma/prisma";
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { Prisma } from "@prisma/client";

const truckService = {

    getDashboardService: async (req: Request) => {
    
            // Await the result for truck count
            const truckCount = await prismaClient.truck.count({ where: { ownerId: req.user.id } });
    
            // Await the result for trucks that are "on-transit"
            const onTransitCount = (await prismaClient.truck.findMany({
                where: { ownerId: req.user.id, status: "on-transit" },
            })).length;

            return {
                status: true,
                data: {
                    totalTrucks: truckCount,
                    onTransitTrucks: onTransitCount,
                },
            };
    },

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
    createTruck: async (req: Request): Promise<any> => {
          const { licensePlate, truckCapacity, truckType, ownerId } = req.body;
          const { id } = req.user;
          const registrationPapers = req.files;
      
          if (!registrationPapers || !Array.isArray(registrationPapers) || registrationPapers.length === 0) {
            return {
              message: "\"registrationPapers\" is required and must be an array of images",
              status: false
            };
          }

          // Step 1: Dynamically upload files one at a time
          const uploadedUrls = [];
          for (const file of registrationPapers) {
            const formData = new FormData();

            formData.append('file', file.buffer, {
              filename: file.originalname,
              contentType: file.mimetype,
            });

            const response = await axios.post(process.env.STORAGE_UPLOAD_URL!, formData, {
              headers: {
                'Content-Type': 'multipart/form-data', // Ensure the correct header is set
                ...formData.getHeaders(), // Add the correct headers for form-data
              },
            });
            if (response.data && response.data.data.url) {
              const {url, key} = response.data.data;
              uploadedUrls.push({
                url,
                key // Save key for future reference
              });
            }
          }

          // Create the truck entry in the database
          const createdTruck = await prismaClient.truck.create({
            data: {
              plateNumber: licensePlate,
              capacity: truckCapacity,
              type: truckType,
              creatorId: id,
              ...(ownerId ? { ownerId } : { ownerId: id }), // Default to user ID if no owner is provided
              registrationPapers: uploadedUrls
            }
          });
          return { status: true, data: createdTruck };
    },
    updateTruck: async (req: Request): Promise<any> => {
      try {
        if (!process.env.STORAGE_UPLOAD_URL) {
          throw new Error('STORAGE_UPLOAD_URL is not defined in the environment variables.');
        }
    
        const uploadedUrls = [];
        const { licensePlate, truckCapacity, truckType, ownerId } = req.body;
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
    
        const oldRegistrationPapers = existingTruck.registrationPapers || [];
    
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
          for (const file of req.files as Express.Multer.File[]) {
            const formData = new FormData();
            formData.append('file', file.buffer, {
              filename: file.originalname,
              contentType: file.mimetype,
            });
    
            const response = await axios.post(process.env.STORAGE_UPLOAD_URL!, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                ...formData.getHeaders(),
              },
            });
    
            if (response.data && response.data.data.url) {
              const { url, key } = response.data.data;
              uploadedUrls.push({ url, key });
            } else {
              throw new Error('Image upload failed');
            }
          }
        }
    
        if (oldRegistrationPapers.length > 0 && uploadedUrls.length > 0) {
          console.log("Old Registration Papers:", oldRegistrationPapers);
          console.log("Storage Base URL:", process.env.STORAGE_UPLOAD_URL);
        
          await Promise.all(oldRegistrationPapers.map(async (oldFile: any) => {
            try {
              const deleteUrl = `${process.env.STORAGE_UPLOAD_URL!}/${oldFile.key}`;
              console.log("Constructed delete URL:", deleteUrl);
        
              await axios.delete(deleteUrl);
            } catch (error: any) {
              if (error?.response?.status  === 404) {
                console.warn(`File not found for deletion: ${oldFile.key}`);
              } else {
                console.error('Failed to delete old registration paper:', error);
              }
            }
          }));
        }
        
        const updatedTruck = await prismaClient.truck.update({
          where: { id: truckId },
          data: {
            plateNumber: licensePlate,
            capacity: truckCapacity,
            type: truckType,
            ownerId: ownerId || req.user.id,
            registrationPapers: uploadedUrls.length > 0 ?(uploadedUrls as Prisma.InputJsonValue[]) // Cast uploadedUrls to InputJsonValue[]
                      : (oldRegistrationPapers as Prisma.InputJsonValue[]),
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
            if (truck.creatorId !== id && truck.ownerId !== id) {
                return {
                    message: "You do not have permission to update this truck",
                    status: false,
                };
            }
 truck.registrationPapers.forEach(async (val : any)=>{
  console.log(val);
  const v = await axios.delete(`${process.env.STORAGE_UPLOAD_URL!}/${val.key}`)
  // console.log(v);
    })
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