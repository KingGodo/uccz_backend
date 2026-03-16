import bcrypt from "bcrypt";
import { db } from "../../database/db";
import { CreateUserDTO, UpdateUserDTO } from "./users.types";

const SALT_ROUNDS = 10;

export const getUsers = async () => {

  const result = await db.query(
    "SELECT id, first_name, last_name, email, phone, role, conference_id, region_id, church_id, is_active, created_at FROM users ORDER BY id ASC"
  );

  return result.rows;

};

export const getUserById = async (id: number) => {

  const result = await db.query(
    "SELECT id, first_name, last_name, email, phone, role, conference_id, region_id, church_id, is_active, created_at FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];

};

export const createUser = async (data: CreateUserDTO) => {

  const existing = await db.query(
    "SELECT id FROM users WHERE email = $1",
    [data.email]
  );

  if (existing.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const result = await db.query(
    `
    INSERT INTO users
    (first_name,last_name,email,phone,password_hash,role,conference_id,region_id,church_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING id,first_name,last_name,email,phone,role,conference_id,region_id,church_id,created_at
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

  return result.rows[0];

};

export const updateUser = async (id: number, data: UpdateUserDTO) => {

  const result = await db.query(
    `
    UPDATE users
    SET
      first_name = COALESCE($1, first_name),
      last_name = COALESCE($2, last_name),
      phone = COALESCE($3, phone),
      role = COALESCE($4, role),
      conference_id = COALESCE($5, conference_id),
      region_id = COALESCE($6, region_id),
      church_id = COALESCE($7, church_id),
      is_active = COALESCE($8, is_active),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $9
    RETURNING id, first_name, last_name, email, phone, role, conference_id, region_id, church_id, is_active
    `,
    [
      data.first_name,
      data.last_name,
      data.phone,
      data.role,
      data.conference_id,
      data.region_id,
      data.church_id,
      data.is_active,
      id
    ]
  );

  return result.rows[0];

};

export const deleteUser = async (id: number) => {

  const result = await db.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id]
  );

  return result.rows[0];

};
