import { Router } from "express";
import { issuesController } from "./ issues.controller";
import { issueService } from "./issues.service";

const route = Router();

route.post("/", issuesController.CreateIssue);
route.get("/", issuesController.getAllIssues);
route.get("/:id", issuesController.getSingleIssue);
route.patch("/:id",issuesController.updatedSingleIssue)

export const issueRoute = route;
