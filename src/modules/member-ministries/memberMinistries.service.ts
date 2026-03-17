import { db } from "../../database/db";
import {
  CreateMemberMinistryDTO,
  UpdateMemberMinistryDTO
} from "./memberMinistries.types";

/*
|--------------------------------------------------------------------------
| Get All Member Ministries
|--------------------------------------------------------------------------
*/
export const getAll = async () => {

  const result = await db.query(`
    SELECT mm.*, 
           m.first_name, m.last_name,
           min.name AS ministry_name
    FROM member_ministries mm
    JOIN members m ON mm.member_id = m.id
    JOIN ministries min ON mm.ministry_id = min.id
    ORDER BY mm.created_at DESC
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
    FROM member_ministries
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Get Ministries For One Member
|--------------------------------------------------------------------------
*/
export const getByMember = async (memberId: number) => {

  const result = await db.query(
    `
    SELECT mm.*, min.name AS ministry_name
    FROM member_ministries mm
    JOIN ministries min ON mm.ministry_id = min.id
    WHERE mm.member_id = $1
    `,
    [memberId]
  );

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Add Member To Ministry
|--------------------------------------------------------------------------
*/
export const create = async (data: CreateMemberMinistryDTO) => {

  const result = await db.query(
    `
    INSERT INTO member_ministries
    (member_id, ministry_id, membership_status, joined_date)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      data.member_id,
      data.ministry_id,
      data.membership_status || "Active",
      data.joined_date || null
    ]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Update Membership
|--------------------------------------------------------------------------
*/
export const update = async (
  id: number,
  data: UpdateMemberMinistryDTO
) => {

  const result = await db.query(
    `
    UPDATE member_ministries
    SET
      membership_status = COALESCE($1, membership_status),
      joined_date = COALESCE($2, joined_date)
    WHERE id = $3
    RETURNING *
    `,
    [
      data.membership_status,
      data.joined_date,
      id
    ]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Remove Member From Ministry
|--------------------------------------------------------------------------
*/
export const remove = async (id: number) => {

  const result = await db.query(
    `
    DELETE FROM member_ministries
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0];

};
