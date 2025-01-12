//import "./instrument";
import express, { Express } from "express";
//import * as Sentry from "@sentry/node";
import logger from "morgan";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import appRoute from "./routes";
import { errorConverter } from "./middleware/error";
import { errorHandler } from "./middleware/error";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import multer, { FileFilterCallback }  from "multer";
import { randomUUID } from "crypto";
// import startJobs from "./cronjob";
// import { rateLimit } from 'express-rate-limit'

const app: Express = express();
const server = http.createServer(app);

// const limiter = rateLimit({
// 	windowMs: 5000, // 15 minutes
// 	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//   message: "You have reached the limit on your request"
// 	// store: ... , // Redis, Memcached, etc. See below.
// })

// Apply the rate limiting middleware to all requests.
// app.use(limiter)

dotenv.config();
if (process.env.ENV === "development" || process.env.ENV === "production") {
  app.use(logger("dev"));
}
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage configuration
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'temp/storage');
//   },
//   filename: (req, file, cb) => {
//     const uuid = randomUUID();
//     const extension = file.originalname.split('.').pop(); // Get file extension
//     cb(null, `${file.fieldname}-${uuid}.${extension}`);
//   }
// });

// File filter configuration
const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback)=> {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'application/pdf') {
    return cb(null, false); // Reject invalid file types
  }
  cb(null, true); // Accept valid file types
};

const limits = {
  fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
};

app.use(multer({ storage, fileFilter ,limits }).array('registrationPapers'))

// app.use(formData.parse());
// swagger auto gen
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

/// AppRoutes
app.use("/api/", appRoute);

//Sentry.setupExpressErrorHandler(app);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


const port = process.env.PORT || 5002
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
