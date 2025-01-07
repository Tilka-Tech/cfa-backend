import { Request, Response } from "express";
import authService from "../../services/auth.service";
import { Prisma } from "@prisma/client";



const postLogIn = async (req: Request, res: Response ): Promise<any> =>{
    try{

        const response = await authService.postLogIn(req);
        if(!response.status){
            return res.status(400).json(response);
        }

        res.json(response)
    }catch(err){
        console.log(err);
            // if (err?.message ) {
            //     if (err.code === 'P2002') {
            //       return res.status(400).json({
            //         message: 'A user with this email already exists.',
            //         field: (err.meta?.target as string[]).join(", "),
            //         status: false,
            //       });
            //     }
            //   }
            res.status(500).json({
                message: `Internal Server Error`,
                status: false,
            });
        }
}


export {
    postLogIn
}
