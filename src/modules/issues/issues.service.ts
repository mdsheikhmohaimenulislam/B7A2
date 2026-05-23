// import { ClientBase } from "pg";
import { pool } from "../../config/db";
import config from "../../config/env";
import type { CreateIssueRequest, JwtUser } from "../../types/issue.types";
import jwt from "jsonwebtoken";

const createIssueIntoDB = async (payload: string, body: CreateIssueRequest) => {
  const { title, description, type } = body;

  if (!body) {
    throw new Error("Request body is empty");
  }

  if (!title || typeof title !== "string") {
    throw new Error("Title is required");
  }

  if (!description || typeof description !== "string") {
    throw new Error("Description is required");
  }

  const allowedTypes = ["bug", "feature_request"];

  if (!allowedTypes.includes(type)) {
    throw new Error("Type must be bug or feature_request");
  }

  if (!config.jwt_secret) {
    throw new Error("JWT_SECRET is missing");
  }
  const decoded = jwt.verify(payload, config.jwt_secret!) as JwtUser;

  const userResult = await pool.query(`SELECT * FROM users WHERE id=$1`, [
    decoded.id,
  ]);

  if (userResult.rows.length === 0) {
    throw new Error("User Not Found!..");
  }

  const reporter_id = userResult.rows[0].id;
//   console.log(reporter_id);

  //   console.log(body);
//   const result = await pool.query(
//     `
//       INSERT INTO issues
//       (title, description, type,reporter_id)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *
//       `,
//     [title, description, type, reporter_id],
//   );
  // console.log("create issues",result);

//   return result.rows[0];
};

export const issueService = {
  createIssueIntoDB,
};
