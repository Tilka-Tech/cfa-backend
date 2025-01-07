import express from "express";
import {postLogIn} from "../controllers/auth"

const authRoute = express.Router();

authRoute.post("/login", postLogIn)

export default  authRoute


