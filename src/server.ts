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
// app.use(formData.parse());

/// AppRoutes
app.use("/api/", appRoute);

//Sentry.setupExpressErrorHandler(app);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

server.listen(process.env.PORT || 5002, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:5002`);
});
