import type { Request, Response } from "express";

import sendRespond from "../../utils/sendResponse";

import { issueService } from "./issues.service";
import sendErrorResponse from "../../utils/errorHandler";

const CreateIssue = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return sendRespond(res, {
        status: 401,
        success: false,
        message: "No token provided",
      });
    }
    if (req.body.status) {
      return sendErrorResponse(res, {
        status: 400,
        success: false,
        message: "You cannot set status while creating an issue",
      });
    }
    const result = await issueService.createIssueIntoDB(token, req.body);

    return sendRespond(res, {
      status: 201,
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: unknown) {
    sendErrorResponse(res, {
      status: 500,
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesIntoDB(req.query);

    return sendRespond(res, {
      status: 200,
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    sendErrorResponse(res, {
      status: 500,
      success: false,
      message: error instanceof Error ? error.message : "Server Error",
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      sendRespond(res, {
        status: 400,
        success: false,
        message: "Issue id is required",
      });
    }
    const result = await issueService.getSingleIssueIntoDB(Number(id));
    if (!result) {
      return sendErrorResponse(res, {
        status: 404,
        success: false,
        message: "Issue not found",
      });
    }

    return sendRespond(res, {
      status: 200,
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    sendErrorResponse(res, {
      status: 500,
      success: false,

      data: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

const updatedSingleIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    if (!token) {
      return sendRespond(res, {
        status: 401,
        success: false,
        message: "No token provided",
      });
    }

    const result = await issueService.updatedSingleIssueIntoDB(
      req.body,
      Number(id),
      token,
    );

    if (!result) {
      return sendErrorResponse(res, {
        status: 404,
        success: false,
        message: "Issue Not Found!..",
      });
    }

    return sendRespond(res, {
      status: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    return sendErrorResponse(res, {
      status: 400,
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

const deletedSingleIssue = async (req: Request, res: Response) => {};

export const issuesController = {
  CreateIssue,
  getAllIssues,
  getSingleIssue,
  updatedSingleIssue,
  deletedSingleIssue,
};
