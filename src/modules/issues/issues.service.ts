// import { ClientBase } from "pg";
import { pool } from "../../config/db";
import config from "../../config/env";
import type {
  CreateIssueRequest,
  IssueQuery,
  JwtUser,
} from "../../types/issue.types";
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
  const result = await pool.query(
    `
      INSERT INTO issues
      (title, description, type,reporter_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
    [title, description, type, reporter_id],
  );
  // console.log("create issues",result);

  return result.rows[0];
};

const getAllIssuesIntoDB = async (IssuesQuery: IssueQuery) => {
  try {
    const { sort = "newest", type, status } = IssuesQuery;
    let query = `SELECT * FROM issues WHERE 1=1`;
    const values: (string | number)[] = [];
    let i = 1;
    if (type) {
      query += ` AND type = $${i}`;
      values.push(type);
      i++;
    }
    if (status) {
      query += ` AND status = $${i}`;
      values.push(status);
      i++;
    }

    if (sort === "oldest") {
      query += ` ORDER BY created_at ASC`;
    } else {
      query += ` ORDER BY created_at DESC`;
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return [];
    }

    const userId = result.rows.map((i) => i.reporter_id);

    const userResult = await pool.query(
      `
        SELECT id, name, role FROM users WHERE id = ANY($1) 
        `,
      [userId],
    );

    const useMap = new Map();

    userResult.rows.forEach((value) => {
      useMap.set(value.id, value);
    });

    const formattedUserResult = result.rows.map((issue) => {
      const user = useMap.get(issue.reporter_id);
      return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: user
          ? {
              id: user.id,
              name: user.name,
              role: user.role,
            }
          : null,

        created_at: issue.created_at,
        updated_at: issue.updated_at,
      };
    });

    return formattedUserResult;
  } catch (error: unknown) {
    throw {
      success: false,
      message: "Failed to fetch issues",
      error,
    };
  }
};

const getSingleIssueIntoDB = async (id: number) => {
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    id,
  ]);

  const issue = issueResult.rows[0];

  if (!issue) return null;

  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id],
  );

  if (issueResult.rows.length === 0) {
    return null;
  }
  const user = userResult.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: user
      ? {
          id: user.id,
          name: user.name,
          role: user.role,
        }
      : null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesIntoDB,
  getSingleIssueIntoDB,
};
