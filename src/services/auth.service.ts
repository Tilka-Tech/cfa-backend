import { Request } from "express";
import prismaClient from "../../prisma/prisma";
import bcrypt from "bcrypt";
import fs from "fs"
import jwt from "jsonwebtoken";
import path from "path";
import emailSender from "../utils/email";


const privateKey = fs.readFileSync(
  path.join(process.cwd(), "auth.key"),
  "utf8"
);

const AuthService = {
  postLogIn: async (req: Request)=>{

    const {email, password} = req.body;

    const foundUser = await prismaClient.user.findUnique({
        where: { email }
    });
    if(!foundUser){
      return {message: "invalid email or password", status: false}
    }
    
      if (!foundUser.isVerified) {
       return   {
          message: "unverified user",
          status: false,
        };
        
      }

      if ( foundUser.status === "Pending") {
        return {
          message: "account pending approval",
          status: false,
        };
      }

      if (foundUser.status === "Suspended") {
        return {
          message: "account suspended",
          status: false,
        };
      }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if(!isPasswordMatch)return {message: "invalid email or password", status: false};

    // Remove password before returning user data
    const { password: _, ...userWithoutPassword } = foundUser;

    const token = jwt.sign({ sub: foundUser }, privateKey, { algorithm: 'RS256', expiresIn: '1h'   });

    return {message: "Login Successful", status: true, data: {user: userWithoutPassword, token}}
  },
  
  postCreateUser: async (req: Request)=>{
    const {fullname, email, phone, password, userType} = req.body
    // check if user already exist 
    const userExist = await prismaClient.user.findFirst({
      where: {email}
    })
    if(userExist) {
      return {status: false, message: "User already exist"}
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await prismaClient.user.create({
      data: {
        email,
        fullname,
        password: hashPassword,
        userType: userType.toLowerCase() === 'truck owner' ? "TruckOwner" : "Driver",
        phone,
        driverStatus: userType.toLowerCase() === "driver" ? "Online" : null,
      },
    });

    // send a welcome mail

    await emailSender(user.email, "", user.fullname, 'welcome', 'Welcome');

    const {password: _, ...userWithoutPassword} = user
    
    return { message: "account created", status: true, data: userWithoutPassword }
  },
  
  forgotPassword: async (req: Request)=>{
    const {email} = req.body
    // check if user exist 
    const userExist = await prismaClient.user.findFirst({
      where: {email}
    })
    if(!userExist) {
      return {status: false, message: "User not found"}
    }

    // send a confirmation mail
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 15 * 60 * 1000);

    await prismaClient.token.create({
      data: {
        token: otp,
        userId: userExist.id,
        type: 'verify-token',
        expires: otpExpiration,
      },
    });

    await emailSender(userExist.email, otp, userExist.fullname, 'verify-email', 'Verify Token');
    
    return { message: "Token has been sent to your email", status: true }
  },

  verifyToken: async (req: Request)=>{
    const {otp} = req.body
    // check if otp exist 
    const token = await prismaClient.token.findFirst({
      where: {token: otp}
    })
    if(!token) {
      return {status: false, message: "Token does not exist"}
    }

    if(token.isBlacklisted) {
      return {status: false, message: "Invalid token"}
    }

    if(token.expires < new Date()) {
      return {status: false, message: "Token expire"}
    }
    
    // update token to blacklisted
    // await prismaClient.token.update({
    //   where: {id: token.id},
    //   data: {isBlacklisted: false}
    // })

    return { message: "token verified", status: true }
  },

  resetPassword: async (req: Request)=>{
    const {otp, password} = req.body
    // check if otp exist 
    const token = await prismaClient.token.findFirst({
      where: {token: otp}
    })
    if(!token) {
      return {status: false, message: "Token does not exist"}
    }

    if(token.isBlacklisted) {
      return {status: false, message: "Invalid token"}
    }
    
    // update token to blacklisted
    await prismaClient.token.update({
      where: {id: token.id},
      data: {isBlacklisted: true}
    })

    // update user password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await prismaClient.user.update({
      where: {id: token.userId},
      data: {
        password: hashPassword,
      },
    });

    // send password reset email
    await emailSender(user.email, "", user.fullname, 'reset-password', 'Password Reset');

    return { message: "password reset", status: true }
  },
}



export default AuthService