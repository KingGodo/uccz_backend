import { db } from "../../database/db";
import { CreateMinistryDTO, UpdateMinistryDTO } from "./ministries.types";

export const getMinistries = async () => {

  const result = await db.query(
    `
    SELECT *
    FROM ministries
    ORDER BY name ASC
    `
  );

  return result.rows;

};

export const getMinistryById = async (id: number) => {

  const result = await db.query(
    `
    SELECT *
    FROM ministries
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];

};

export const createMinistry = async (data: CreateMinistryDTO) => {

  const result = await db.query(
    `
    INSERT INTO ministries (name, description)
    VALUES ($1, $2)
    RETURNING *
    `,
    [
      data.name,
      data.description || null
    ]
  );

  return result.rows[0];

};

export const updateMinistry = async (id: number, data: UpdateMinistryDTO) => {

  const result = await db.query(
    `
    UPDATE ministries
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

export const deleteMinistry = async (id: number) => {

  const result = await db.query(
    `
    DELETE FROM ministries
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0];

};
