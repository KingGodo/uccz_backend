import { db } from "../../database/db";
import { CreateMemberDTO, UpdateMemberDTO } from "./members.types";

export const getMembers = async () => {

  const result = await db.query(
    `
    SELECT *
    FROM members
    ORDER BY created_at DESC
    `
  );

  return result.rows;

};

export const getMemberById = async (id: number) => {

  const result = await db.query(
    `
    SELECT *
    FROM members
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];

};

export const createMember = async (data: CreateMemberDTO) => {

  const result = await db.query(
    `
    INSERT INTO members
    (
      church_id,
      prefix,
      first_name,
      second_name,
      last_name,
      sex,
      date_of_birth,
      active_status,
      date_joined_uccz,
      has_relative_in_uccz
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
    `,
    [
      data.church_id,
      data.prefix || null,
      data.first_name,
      data.second_name || null,
      data.last_name,
      data.sex || null,
      data.date_of_birth || null,
      data.active_status || null,
      data.date_joined_uccz || null,
      data.has_relative_in_uccz ?? false
    ]
  );

  return result.rows[0];

};

export const updateMember = async (id: number, data: UpdateMemberDTO) => {

  const result = await db.query(
    `
    UPDATE members
    SET
      prefix = COALESCE($1, prefix),
      first_name = COALESCE($2, first_name),
      second_name = COALESCE($3, second_name),
      last_name = COALESCE($4, last_name),
      sex = COALESCE($5, sex),
      date_of_birth = COALESCE($6, date_of_birth),
      active_status = COALESCE($7, active_status),
      date_joined_uccz = COALESCE($8, date_joined_uccz),
      has_relative_in_uccz = COALESCE($9, has_relative_in_uccz),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $10
    RETURNING *
    `,
    [
      data.prefix,
      data.first_name,
      data.second_name,
      data.last_name,
      data.sex,
      data.date_of_birth,
      data.active_status,
      data.date_joined_uccz,
      data.has_relative_in_uccz,
      id
    ]
  );

  return result.rows[0];

};

export const deleteMember = async (id: number) => {

  const result = await db.query(
    `
    DELETE FROM members
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0];

};
