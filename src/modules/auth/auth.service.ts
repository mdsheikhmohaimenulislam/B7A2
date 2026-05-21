import bcrypt from "bcryptjs";
import {
  role,
  type CreateLoginRequest,
  type User,
} from "../../types/user.types";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config/env";

const createSignupIntoDB = async (payload: User) => {
  const { name, email, password, role } = payload;

  const roleValue = role ?? "contributor";

  const hashPassword = await bcrypt.hash(String(password), 10);

  const result = await pool.query(
    `
      INSERT INTO users(name,email,password,role)
      VALUES($1,$2,$3,$4)
      RETURNING *
    `,
    [name, email, hashPassword, roleValue],
  );

  delete result.rows[0].password;
  // console.log(result.rows[0]);
  return result;
};

const userLoginIntoDB = async (payload: CreateLoginRequest) => {
  const { email, password } = payload;
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }

  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }

  //   Generate Token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1d",
  });

  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return { token: accessToken, user: userResponse };
};

export const userService = {
  createSignupIntoDB,
  userLoginIntoDB,
};
