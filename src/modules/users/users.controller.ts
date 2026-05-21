import type { Request, Response } from "express";
import sendRespond from "../../utils/sendResponse";
import { userService } from "./users.service";

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
    sendRespond(res, {
      status: 500,
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const userController = {
  createSignup,
};
