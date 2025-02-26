import express from "express";
import AuthController from "../controllers/auth"
import validate from "../validations/validate";
import AuthValidation from "../validations/auth.validation";

const authRoute = express.Router();

authRoute.post("/login", validate(AuthValidation.login), AuthController.postLogIn);
authRoute.post("/register", validate(AuthValidation.register), AuthController.postCreateUser)
authRoute.post("/forgot-password", validate(AuthValidation.forgotPassword), AuthController.forgotPassword)
authRoute.post("/verify-token", validate(AuthValidation.verifyToken), AuthController.verifyToken)
authRoute.post("/reset-password", validate(AuthValidation.resetPassword), AuthController.resetPassword)

export default  authRoute


