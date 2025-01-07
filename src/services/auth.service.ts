import { Request } from "express";
import prismaClient from "../../prisma/prisma";
import bcrypt from "bcrypt";
import fs from "fs"
import jwt from "jsonwebtoken";
import path from "path";


const privateKey = fs.readFileSync(
    path.join(__dirname, "../", "../", "auth.key"),
    "utf8"
  );

const postLogIn = async (req: Request)=>{

    const {email, password} = req.body;

    const foundUser = await prismaClient.user.findUnique({
        where: { email }
    });
    if(!foundUser){
     return {message: "invalid email or password", status: false}
    }
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if(!isPasswordMatch)return {message: "invalid email or password", status: false};

    const token = jwt.sign({ user: foundUser }, privateKey, { algorithm: 'RS256', expiresIn: '1h'   });

    return {message: "Login Successful", status: true, data: {user: foundUser, token}}
}


export default {
    postLogIn
}