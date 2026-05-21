import { Router } from "express";
import { userController } from "./users.controller";

const route = Router();

route.post("/", userController.createSignup);

export const userRoute = route;
