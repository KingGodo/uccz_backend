import { db } from "../../database/db";
import { CreateConferenceDTO } from "./conferences.types";

export const getAllConferences = async () => {
  const result = await db.query(
    "SELECT * FROM conferences ORDER BY id ASC"
  );

  return result.rows;
};

export const getConferenceById = async (id: number) => {
  const result = await db.query(
    "SELECT * FROM conferences WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

export const createConference = async (data: CreateConferenceDTO) => {
  const result = await db.query(
    `INSERT INTO conferences (name, description)
     VALUES ($1, $2)
     RETURNING *`,
    [data.name, data.description]
  );

  return result.rows[0];
};
