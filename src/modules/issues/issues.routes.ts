import { Router } from "express";
import { issuesController } from "./ issues.controller";


const route = Router();

route.post("/", issuesController.CreateIssue);
route.get("/", issuesController.getAllIssues);
route.get("/:id", issuesController.getSingleIssue);
route.patch("/:id",issuesController.updatedSingleIssue)
route.delete("/:id", issuesController.updatedSingleIssue)

export const issueRoute = route;
