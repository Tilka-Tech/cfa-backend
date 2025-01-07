import { Request, Response } from "express"
import userService from "../../services/user.service";
import { Prisma } from '@prisma/client';


const postCreateUser = async (req : Request, res: Response): Promise<any>=>{
    try{
        const response = await userService.postCreateUser(req)

        if(!response.status){
            return res.status(400).json(response);
        }
        res.status(200).json(response);

    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
              return res.status(400).json({
                message: 'A user with this email already exists.',
                field: (err.meta?.target as string[]).join(", "),
                status: false,
              });
            }
          }
        res.status(500).json({
            message: `Internal Server Error`,
            status: false,
        });
    }

}


export {
    postCreateUser
}