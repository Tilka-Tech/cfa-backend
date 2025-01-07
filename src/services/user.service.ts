import { Request } from "express"
import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";


const postCreateUser = async (req: Request)=>{
const {fullName, email, phone, userType, password, addresses} = req.body
const salt = await bcrypt.genSalt(12);
const hashPassword = await bcrypt.hash(password, salt)
const [firstName, lastName] = fullName.split(" ")
const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashPassword,
      userType,
      phone,
      addresses: addresses
        ? {
            create: {
              country: addresses.country,
              state: addresses.state,
              city: addresses.city,
              street: addresses.street,
              houseNumber: addresses.houseNumber,
              landmark: addresses.landmark,
              postalCode: addresses.postalCode,
              status: addresses.status,
              isDefault: addresses.isDefault,
            },
          }
        : undefined
    },
  });

return { message: "user created", status: true, data: user }
}

export default {
    postCreateUser
}