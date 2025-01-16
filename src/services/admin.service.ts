import { Request } from "express"
import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";

const AdminService = {
  getDashboardAnalytics: async (req: Request)=>{

    // get analytics data
    const truck = await prisma.truck.count({
      where: {status: "In_Transit"}
    })

    const completed = await prisma.order.count({
      where: {status: "Completed"}
    })

    const pendingRequest = await prisma.order.count({
      where: {status: "Pending"}
    })

    const pendingVerification = await prisma.user.count({
      where: {status: "Pending"}
    })

    const recentTransactions = await prisma.transaction.findMany({
      where: {},
      take: 10,
      orderBy: {createdAt: "asc"}
    })


    return {
      message: "Analytics retrieved",
      status: true,
      data: {
        overview: {
          truckInTransit: truck,
          completed,
          pendingRequest,
          pendingVerification
        },
        totalRevenue: {},
        recentTransactions
      }
     }
  },

  getUsers: async (req: Request)=>{

    // get analytics data
    const truck = await prisma.truck.count({
      where: {status: "In_Transit"}
    })

    const completed = await prisma.order.count({
      where: {status: "Completed"}
    })

    const pendingRequest = await prisma.order.count({
      where: {status: "Pending"}
    })

    const pendingVerification = await prisma.user.count({
      where: {status: "Pending"}
    })

    const recentTransactions = await prisma.transaction.findMany({
      where: {},
      take: 10,
      orderBy: {createdAt: "asc"}
    })


    return {
      message: "Analytics retrieved",
      status: true,
      data: {
        overview: {
          truckInTransit: truck,
          completed,
          pendingRequest,
          pendingVerification
        },
        totalRevenue: {},
        recentTransactions
      }
     }
  }
}

export default AdminService