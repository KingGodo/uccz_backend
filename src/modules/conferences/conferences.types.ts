export interface Conference {
  id: number;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateConferenceDTO {
  name: string;
  description?: string;
}
