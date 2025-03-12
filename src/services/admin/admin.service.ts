import { Request } from "express"
import prisma from "../../../prisma/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

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
    const {userType="User", status, search, pageNumber, pageSize} = req.query
    const where: Prisma.UserWhereInput = {}
    // if(userType && (userType === "User" || userType === "Admin" || userType === "Driver" || userType === "TruckOwner")){
    //   where.userType = userType
    // }

    if(status && (status === "Suspended" || status === "Pending" || status === "Active")){
      where.status = status
    }

        // Add fuzzy search for `fullname` or `email`
    if (search) {
      where.OR = [
        { fullname: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } }
      ];
    }

    let skip, take
    if(pageNumber && pageSize){
      skip = (Number(pageNumber) - 1) * Number(pageSize);
      take = Number(pageSize);
    }

    // get all users
    const data = await prisma.user.findMany({
      where,
      skip,
      take,
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

  getRoles: async (req: Request)=>{

    // get all roles
    const data = await prisma.role.findMany({
      include: {permissions: true}
    })

    const count = await prisma.role.count()

    return {
      message: "Roles retrieved",
      status: true,
      data,
      count
     }
  },

  getOneRole: async (req: Request)=>{
    const roleId = req.params.id
    // get one role
    const data = await prisma.role.findUnique({
      where: {id: roleId},
      include: {
        permissions: true,
        users: true
      }
    })

    return {
      message: "Role retrieved",
      status: true,
      data
     }
  },

  findOrCreateRole: async (req: Request)=>{
    const {name} = req.body

    const found = await prisma.role.findMany({
      where: { name: { contains: name as string, mode: "insensitive" } }
    });

     // Check if any matching role exists
    if(found.length > 0){
      return {
        message: "Role found",
        status: true,
        data: found
      }
    }

    // If no match, create a new role
    const data = await prisma.role.create({
      data: {
        name,
      }
    })

    return {
      message: "Role created",
      status: true,
      data
     }
  },

  getPermissions: async (req: Request)=>{

    // get all permissions
    const data = await prisma.permission.findMany()

    const count = await prisma.permission.count()

    return {
      message: "permissions retrieved",
      status: true,
      data,
      count
     }
  },

  getOnePermission: async (req: Request)=>{
    const permissionId = req.params.id
    // get one permission
    const data = await prisma.permission.findUnique({
      where: {id: permissionId},
      // include: {
      //   // permissions: true,
      //   users: true
      // }
    })

    return {
      message: "permission retrieved",
      status: true,
      data
     }
  },
  addRoleToPermissions:  async (req: Request)=>{
    const {permissionIds, roleId} = req.body

    // Ensure permissionIds is an array and roleId is provided
    if (!Array.isArray(permissionIds) || !roleId) {
      return {
        message: "Invalid input. Ensure permissionIds is an array and roleId is provided.",
        status: false
      };
    }

     // Update the role to connect the permissions
     const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          connect: permissionIds.map(id => ({ id })) // Connect multiple permissions
        }
      },
      include: { permissions: true } // Return updated role with permissions
    });

    return {
      message: "Permissions added to role successfully",
      status: true,
      data: updatedRole
    };
  },
  assignRoleToUser:async (req: Request)=>{
    const {userId, roleId} = req.body

    // Ensure permissionIds is an array and roleId is provided
    if (!userId || !roleId) {
      return {
        message: "Invalid input. Ensure userId and roleId is provided.",
        status: false
      };
    }

     // Update the role to connect the permissions
     const updatedRole = await prisma.user.update({
      where: { id: userId },
      data: {
        roleId
      }
        
    });

    return {
      message: "role added to user successfully",
      status: true,
      data: updatedRole
    };
  },
  updateUserStatus: async (req: Request)=>{
    const userId = req.params.id
    const {status} = req.body
    const foundUser = await prisma.user.findUnique({
      where: {id: userId}})
    if(!foundUser){
      return {status: false, message: "User not found"}
    }

    if(status !== "Active" && status !== "Suspended" && status !== "Pending"){
      return {status: false, message: "Invalid status"}
    }

    if(foundUser.status === status){
      return {status: false, message: `User status is already ${status}`}
    }

    // update user status
    const updatedData = await prisma.user.update({
      where: {id: userId},
      data: {
        status
      }
    })
    const {password: _, ...data} = updatedData
    return {
      message: "User status updated",
      status: true,
      data
     }
  }
}

export default AdminService