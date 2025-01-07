import express from "express";
import { postCreateUser } from "../controllers/user";
import validate from "../validations/validate";
import userValidation from "../validations/user.validation";

const authRoute = express.Router();

authRoute.post("/create-user", validate(userValidation.register), postCreateUser )

export default authRoute;