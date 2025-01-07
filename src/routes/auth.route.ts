import express from "express";
import {postLogIn} from "../controllers/auth"
import validate from "../validations/validate";
import authValidation from "../validations/auth.validation";

const authRoute = express.Router();

authRoute.post("/login", validate(authValidation.login), postLogIn)

export default  authRoute


