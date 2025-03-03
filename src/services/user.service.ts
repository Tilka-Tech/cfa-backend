import { Request } from "express"
import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";

const UserService = {
  postCreateUser: async (req: Request)=>{
    const {fullname, email, phone, userType, password} = req.body
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await prisma.user.create({
        data: {
          email,
          fullname,
          password: hashPassword,
          userType,
          phone,
        },
        select: {
          id: true,
          email: true,
          fullname: true,
          userType: true,
          phone: true,
          createdAt: true,
          updatedAt: true
        }
      });
    
    return { message: "user created", status: true, data: user }
  }
}

export default UserService