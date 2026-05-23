import { Router } from "express";
import { issuesController } from "./ issues.controller";

const route = Router()

route.post("/", issuesController.CreateIssue)
route.get("/", issuesController.getAllIssues)


export const issueRoute = route;