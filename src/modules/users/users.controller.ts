import type { Request, Response } from "express";
import sendRespond from "../../utils/sendResponse";
import { userService } from "./users.service";
import sendErrorResponse from "../../utils/errorHandler";

const createSignup = async (req: Request, res: Response) => {
  //   console.log(req.body);
  try {
    const result = await userService.createSignupIntoDB(req.body);
    return sendRespond(res, {
      status: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: unknown) {
    sendErrorResponse(res, {
      status: 400,
      success: false,
      message: "Invalid input data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const userController = {
  createSignup,
};
