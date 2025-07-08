import express from "express";
import { forgetPassword, resetPassword, userLogin, userSignUp } from "../controllers/userController.js";

export const userRouter = express.Router()


userRouter.post("/signup", userSignUp)

userRouter.post("/login", userLogin)

userRouter.post("/forget-password", forgetPassword)

userRouter.post("/reset-password/:token", resetPassword)

