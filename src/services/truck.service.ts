import { Request } from "express";
import prismaClient from "../../prisma/prisma";
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

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
            
            // Create a readable stream for the file buffer
            const stream = fs.createReadStream(file.path); // Path of the file

      
            formData.append('file', stream, {
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
              uploadedUrls.push({
                url: response.data.data.url,
                key: response.data.data.key // Save key for future reference
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
        let uploadedUrls = []; // Array to store uploaded URLs
        let oldRegistrationPapers = []; // Store existing papers if any
          const { licensePlate, truckCapacity, truckType, ownerId } = req.body;
          const { id } = req.user;
          const { truckId } = req.params;  // Assuming truckId is passed in the URL params
          const registrationPapers = req.files;
      
          // Step 1: Find the existing truck by truckId
          const existingTruck = await prismaClient.truck.findUnique({
            where: { id: truckId },
          });
      
          if (!existingTruck) {
            return { status: false, message: 'Truck not found' };
          }
      
          oldRegistrationPapers = existingTruck.registrationPapers || [];
      
          // Step 2: If new registration papers are provided, upload them
          if (registrationPapers && registrationPapers) {
            // Step 2.1: Dynamically upload files one at a time
            for (const file of registrationPapers) {
              const formData = new FormData();
      
              // Create a readable stream for the file buffer
              const stream = fs.createReadStream(file.path); // Path of the file
      
              console.log("for", formData);
      
              formData.append('file', stream, {
                filename: file.originalname,
                contentType: file.mimetype,
              });
      
              console.log("before axios", process.env.STORAGE_UPLOAD_URL);
      
              const response = await axios.post(process.env.STORAGE_UPLOAD_URL!, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Ensure the correct header is set
                  ...formData.getHeaders(), // Add the correct headers for form-data
                },
              });
      
              console.log("after axios");
              console.log('Response:', response.data);
      
              if (response.data && response.data.url) {
                uploadedUrls.push({
                  url: response.data.url,
                  key: response.data.key // Save key for future reference
                });
              } else {
                // If the image upload fails, delete the file and throw an error
                fs.unlinkSync(file.path); // Delete the file
                throw new Error("Image upload failed, file has been deleted");
              }
            }
          }
      
          // Step 3: If there are old registration papers, delete them (only if they are replaced)
          if (oldRegistrationPapers.length > 0 && uploadedUrls.length > 0) {
            for (const oldFile of oldRegistrationPapers) {
              // Delete the old registration papers from storage
              try {
                await axios.delete(`${process.env.STORAGE_UPLOAD_URL!}/${oldFile.key}`);
              } catch (error) {
                console.error('Failed to delete old registration paper:', error);
              }
            }
          }
      
          // Step 4: Update the truck entry in the database
          const updatedTruck = await prismaClient.truck.update({
            where: { id: truckId },
            data: {
              plateNumber: licensePlate,
              capacity: truckCapacity,
              type: truckType,
              ...(ownerId ? { ownerId } : { ownerId: id }), // Default to user ID if no owner is provided
              registrationPapers: uploadedUrls.length > 0 ? uploadedUrls : oldRegistrationPapers // Keep old papers if no new papers are provided
            }
          });
      
          console.log(updatedTruck);
      
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