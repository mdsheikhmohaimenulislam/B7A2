import bcrypt from "bcryptjs";
import type { User } from "../../types/user.types";
import { pool } from "../../config/db";

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
    [name, email, hashPassword, roleValue]
  );

  delete result.rows[0].password;
  // console.log(result.rows[0]);
  return result;
};

export const userService = {
  createSignupIntoDB,
};
