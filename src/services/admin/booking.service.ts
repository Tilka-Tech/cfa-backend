import { Request } from "express"
import prisma from "../../../prisma/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

const BookingService = {
  getUsers: async (req: Request)=>{
    const {userType="User", status = "Active"} = req.query
    const where: Prisma.UserWhereInput = {}
    if(userType && (userType === "User" || userType === "Admin" || userType === "Driver" || userType === "TruckOwner")){
      where.userType = userType
    }

    if(status && (status === "Suspended" || status === "Pending" || status === "Active")){
      where.status = status
    }
    // get all users
    const data = await prisma.user.findMany({
      where,
      select: {
        userType: true,
        createdAt: true,
        email: true,
        fullname: true,
        isVerified: true,
        phone: true,
        role: true,
        status: true,
        createBy: true
      }
    })

    const count = await prisma.user.count({
      where
    })


    return {
      message: "Users retrieved",
      status: true,
      data,
      count
     }
  },

  getOneUser: async (req: Request)=>{
    const userId = req.params.id
    // get one user
    const data = await prisma.user.findUnique({
      where: {id: userId},
      select: {
        userType: true,
        createdAt: true,
        email: true,
        fullname: true,
        isVerified: true,
        phone: true,
        role: true,
        status: true,
        createBy: true,
        transaction: true,
        order: true,
        addresses: true,
        roleId: true,
        truck: true
      }
    })

    return {
      message: "User retrieved",
      status: true,
      data
     }
  },

  createUser: async (req: Request)=>{
    const {userType, roleId, email, phone, fullname, password} = req.body

    // check if email already exist
    const emailExist = await prisma.user.findUnique({
      where: {email}
    })
    if(emailExist){
      return {status: false, message: "User with email already exist"}
    }

    // check if role exist for Admin Usertype
    if(userType === "Admin"){
      if(!roleId){
        return {status: false, message: "roleId must be passed to create admin user"}
      }
      const role = await prisma.role.findUnique({
        where: {id: roleId}
      })
      if(!role){
        return {status: false, message: "role does not exist"}
      }
    }
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(password, salt)

    // create new user
    const data = await prisma.user.create({
      data: {
        userType,
        email,
        fullname,
        phone,
        ...(userType === "Admin" && {role: roleId}),
        status: "Active",
        createBy: req.user.id,
        password: hashPassword,
      }
    })

    // send email to user

    return {
      message: "Users created successfuly",
      status: true,
      data,
     }
  },

}

export default BookingService