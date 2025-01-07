import { PrismaClient } from "@prisma/client";

// const {  } = require('@prisma/client')

const prismaClient = new PrismaClient({
    errorFormat: "minimal", log: ["query"]
})


export default prismaClient;