import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { db } from "../../database/db";
import { env } from "../../config/env";
import { RegisterDTO, LoginDTO } from "./auth.types";

const SALT_ROUNDS = 10;

/*
|--------------------------------------------------------------------------
| Generate JWT Token
|--------------------------------------------------------------------------
*/
const generateToken = (user: any) => {

  const jwtOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  };

  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      church_id: user.church_id,
      region_id: user.region_id,
      conference_id: user.conference_id
    },
    env.JWT_SECRET as string,
    jwtOptions
  );
};

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/
export const registerUser = async (data: RegisterDTO) => {

  const existingUser = await db.query(
    "SELECT id FROM users WHERE email = $1",
    [data.email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const result = await db.query(
    `
    INSERT INTO users
    (
      first_name,
      last_name,
      email,
      phone,
      password_hash,
      role,
      conference_id,
      region_id,
      church_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING
      id,
      first_name,
      last_name,
      email,
      phone,
      role,
      conference_id,
      region_id,
      church_id,
      created_at
    `,
    [
      data.first_name,
      data.last_name,
      data.email,
      data.phone || null,
      passwordHash,
      data.role,
      data.conference_id || null,
      data.region_id || null,
      data.church_id || null
    ]
  );

  const user = result.rows[0];

  const token = generateToken(user);

  return {
    user,
    token
  };
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/
export const loginUser = async (data: LoginDTO) => {

  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [data.email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    user.password_hash
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  delete user.password_hash;

  return {
    user,
    token
  };
};
