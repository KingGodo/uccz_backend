import { db } from "../../database/db";
import {
  CreateMemberCouncilDTO,
  UpdateMemberCouncilDTO
} from "./memberCouncils.types";

/*
|--------------------------------------------------------------------------
| Get All Member Councils
|--------------------------------------------------------------------------
*/
export const getAll = async () => {

  const result = await db.query(`
    SELECT mc.*,
           m.first_name, m.last_name,
           c.name AS council_name
    FROM member_councils mc
    JOIN members m ON mc.member_id = m.id
    JOIN councils c ON mc.council_id = c.id
    ORDER BY mc.id DESC
  `);

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Get By ID
|--------------------------------------------------------------------------
*/
export const getById = async (id: number) => {

  const result = await db.query(
    `
    SELECT *
    FROM member_councils
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Get Councils for a Member
|--------------------------------------------------------------------------
*/
export const getByMember = async (memberId: number) => {

  const result = await db.query(
    `
    SELECT mc.*, c.name AS council_name
    FROM member_councils mc
    JOIN councils c ON mc.council_id = c.id
    WHERE mc.member_id = $1
    `,
    [memberId]
  );

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Get Members in a Council
|--------------------------------------------------------------------------
*/
export const getByCouncil = async (councilId: number) => {

  const result = await db.query(
    `
    SELECT mc.*, m.first_name, m.last_name
    FROM member_councils mc
    JOIN members m ON mc.member_id = m.id
    WHERE mc.council_id = $1
    `,
    [councilId]
  );

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Assign Member to Council
|--------------------------------------------------------------------------
*/
export const create = async (data: CreateMemberCouncilDTO) => {

  const result = await db.query(
    `
    INSERT INTO member_councils
    (member_id, council_id, role, joined_date)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      data.member_id,
      data.council_id,
      data.role || null,
      data.joined_date || null
    ]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Update Role / Membership
|--------------------------------------------------------------------------
*/
export const update = async (
  id: number,
  data: UpdateMemberCouncilDTO
) => {

  const result = await db.query(
    `
    UPDATE member_councils
    SET
      role = COALESCE($1, role),
      joined_date = COALESCE($2, joined_date)
    WHERE id = $3
    RETURNING *
    `,
    [
      data.role,
      data.joined_date,
      id
    ]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Remove Member from Council
|--------------------------------------------------------------------------
*/
export const remove = async (id: number) => {

  const result = await db.query(
    `
    DELETE FROM member_councils
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0];

};
