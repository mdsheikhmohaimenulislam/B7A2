import { Router } from "express";
import { userController } from "./auth.controller";


const route = Router();

route.post("/signup", userController.createSignup);
route.post("/login", userController.userLogin)

export const userRoute = route;
