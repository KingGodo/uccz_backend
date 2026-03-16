export interface Region {
  id: number;
  conference_id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateRegionDTO {
  conference_id: number;
  name: string;
}

export interface UpdateRegionDTO {
  name?: string;
}
