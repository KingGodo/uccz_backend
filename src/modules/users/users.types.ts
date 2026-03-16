export interface CreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
  conference_id?: number;
  region_id?: number;
  church_id?: number;
}

export interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: string;
  conference_id?: number;
  region_id?: number;
  church_id?: number;
  is_active?: boolean;
}
