
import multer from "multer";
import express, { Router, response } from "express";

// var storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/" });

const appRoute: Router = express.Router();

appRoute.get("/", (req, res) => {
  res.send("<h1>Welcome Tilka Inventory managements</h1>");
});

export default appRoute;