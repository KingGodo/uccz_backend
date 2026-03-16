import { db } from "../../database/db";
import { CreateRegionDTO, UpdateRegionDTO } from "./regions.types";

export const getAllRegions = async () => {
  const result = await db.query(
    `SELECT r.*, c.name AS conference_name
     FROM regions r
     JOIN conferences c ON r.conference_id = c.id
     ORDER BY r.id ASC`
  );

  return result.rows;
};

export const getRegionById = async (id: number) => {
  const result = await db.query(
    "SELECT * FROM regions WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

export const getRegionsByConference = async (conferenceId: number) => {
  const result = await db.query(
    "SELECT * FROM regions WHERE conference_id = $1",
    [conferenceId]
  );

  return result.rows;
};

export const createRegion = async (data: CreateRegionDTO) => {
  const result = await db.query(
    `INSERT INTO regions (conference_id, name)
     VALUES ($1, $2)
     RETURNING *`,
    [data.conference_id, data.name]
  );

  return result.rows[0];
};

export const updateRegion = async (
  id: number,
  data: UpdateRegionDTO
) => {

  const result = await db.query(
    `UPDATE regions
     SET name = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [data.name, id]
  );

  return result.rows[0];
};

export const deleteRegion = async (id: number) => {

  const result = await db.query(
    "DELETE FROM regions WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};
