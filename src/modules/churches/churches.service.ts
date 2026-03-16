import { db } from "../../database/db";
import {
  CreateChurchDTO,
  UpdateChurchDTO
} from "./churches.types";

export const getAllChurches = async () => {

  const result = await db.query(`
      SELECT
        ch.*,
        r.name AS region_name,
        c.name AS conference_name
      FROM churches ch
      JOIN regions r ON ch.region_id = r.id
      JOIN conferences c ON r.conference_id = c.id
      ORDER BY ch.id ASC
  `);

  return result.rows;

};

export const getChurchById = async (id: number) => {

  const result = await db.query(
    "SELECT * FROM churches WHERE id = $1",
    [id]
  );

  return result.rows[0];

};

export const getChurchesByRegion = async (regionId: number) => {

  const result = await db.query(
    "SELECT * FROM churches WHERE region_id = $1",
    [regionId]
  );

  return result.rows;

};

export const createChurch = async (data: CreateChurchDTO) => {

  const result = await db.query(
    `INSERT INTO churches
     (region_id, name, city, address, contact_phone, contact_email)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [
      data.region_id,
      data.name,
      data.city,
      data.address,
      data.contact_phone,
      data.contact_email
    ]
  );

  return result.rows[0];

};

export const updateChurch = async (
  id: number,
  data: UpdateChurchDTO
) => {

  const result = await db.query(
    `UPDATE churches
     SET name = $1,
         city = $2,
         address = $3,
         contact_phone = $4,
         contact_email = $5,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $6
     RETURNING *`,
    [
      data.name,
      data.city,
      data.address,
      data.contact_phone,
      data.contact_email,
      id
    ]
  );

  return result.rows[0];

};

export const deleteChurch = async (id: number) => {

  const result = await db.query(
    "DELETE FROM churches WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];

};
