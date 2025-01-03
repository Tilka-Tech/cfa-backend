// import { Namespace } from "socket.io";

export {}

declare global{
   namespace Express {
      interface Request {
        user: any,
      }
   }
}
