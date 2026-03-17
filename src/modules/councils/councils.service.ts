import { db } from "../../database/db";
import {
  CreateCouncilDTO,
  UpdateCouncilDTO
} from "./councils.types";

/*
|--------------------------------------------------------------------------
| Get All Councils
|--------------------------------------------------------------------------
*/
export const getCouncils = async () => {

  const result = await db.query(`
    SELECT c.*, ch.name AS church_name
    FROM councils c
    JOIN churches ch ON c.church_id = ch.id
    ORDER BY c.created_at DESC
  `);

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Get Council By ID
|--------------------------------------------------------------------------
*/
export const getCouncilById = async (id: number) => {

  const result = await db.query(
    `
    SELECT *
    FROM councils
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Get Councils By Church
|--------------------------------------------------------------------------
*/
export const getCouncilsByChurch = async (churchId: number) => {

  const result = await db.query(
    `
    SELECT *
    FROM councils
    WHERE church_id = $1
    ORDER BY created_at DESC
    `,
    [churchId]
  );

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Create Council
|--------------------------------------------------------------------------
*/
export const createCouncil = async (data: CreateCouncilDTO) => {

  const result = await db.query(
    `
    INSERT INTO councils (church_id, name, description)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [
      data.church_id,
      data.name || null,
      data.description || null
    ]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Update Council
|--------------------------------------------------------------------------
*/
export const updateCouncil = async (
  id: number,
  data: UpdateCouncilDTO
) => {

  const result = await db.query(
    `
    UPDATE councils
    SET
      name = COALESCE($1, name),
      description = COALESCE($2, description)
    WHERE id = $3
    RETURNING *
    `,
    [
      data.name,
      data.description,
      id
    ]
  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Delete Council
|--------------------------------------------------------------------------
*/
export const deleteCouncil = async (id: number) => {

  const result = await db.query(
    `
    DELETE FROM councils
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0];

};
