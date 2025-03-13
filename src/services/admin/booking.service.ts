import { Request } from "express"
import prisma from "../../../prisma/prisma";
import bcrypt from "bcrypt";
import { OrderStatus, Prisma } from "@prisma/client";

const BookingService = {
  getBookings: async (req: Request)=>{
    const {status} = req.query
    const where: Prisma.OrderWhereInput = {}
    if(status){
      where.status = status as OrderStatus
    }

    // get all orders
    const data = await prisma.order.findMany({
      where,

    })

    // get order count
    const count = await prisma.order.count({
      where
    })


    return {
      message: "Orders retrieved",
      status: true,
      data,
      count
     }
  },

  getOneBooking: async (req: Request)=>{
    const id = req.params.id
    // get one ordere
    const data = await prisma.order.findUnique({
      where: {id},
    })

    return {
      message: "Order retrieved",
      status: true,
      data
     }
  },

  updateBooking: async (req: Request)=>{
    const {status} = req.body
    const {id} = req.params

    // check if order
    const orderExist = await prisma.order.findUnique({
      where: {id}
    })
    if(!orderExist){
      return {status: false, message: "Order does not exist"}
    }

    // update order
    const data = await prisma.order.update({
      data: {
        status
      },
      where: {id}
    })

    return {
      message: "Order status updated successfuly",
      status: true,
      data,
     }
  },

  assignTruckAndDriver: async (req: Request)=>{
    const {truckId, driverId} = req.body
    const {id} = req.params
    // check if order exist
    const order = await prisma.order.findFirst({
      where: {id}
    })
    if(!order){
      return {
        message: "Order not found",
        status: false,
       }
    }

    if(order.status === "In_Progress"){
      return {
        message: "Order has been accepted",
        status: false,
       }
    }

    // check if driver exist
    const driver = await prisma.user.findFirst({
      where: {AND: [{id: driverId}, {userType: "Driver"}]}
    })
    if(!driver){
      return {
        message: "Driver not found",
        status: false,
       }
    }
    if(driver.status !== "Active"){
      return {
        message: "Driver has been either suspended or pending",
        status: false,
       }
    }
    if(driver.driverStatus !== "Online"){
      return {
        message: "Driver currently not available",
        status: false,
       }
    }
    // check if truck exist
    const truck = await prisma.truck.findFirst({
      where: {id: truckId}
    })

    if(!truck){
      return {
        message: "Truck not found",
        status: false,
       }
    }

    if(truck.status !== "Active"){
      return {
        message: "Truck is currently not available for use",
        status: false,
       }
    }

    // send email to driver

    return {
      message: "Truck and driver assigned to the order",
      status: true,
     }
  },

}

export default BookingService