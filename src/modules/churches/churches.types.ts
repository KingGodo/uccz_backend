export interface Church {
  id: number;
  region_id: number;
  name: string;
  city?: string;
  address?: string;
  contact_phone?: string;
  contact_email?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateChurchDTO {
  region_id: number;
  name: string;
  city?: string;
  address?: string;
  contact_phone?: string;
  contact_email?: string;
}

export interface UpdateChurchDTO {
  name?: string;
  city?: string;
  address?: string;
  contact_phone?: string;
  contact_email?: string;
}
