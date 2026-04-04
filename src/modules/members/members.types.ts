export interface CreateMemberDTO {
  church_id: number;

  prefix?: string;
  first_name: string;
  second_name?: string;
  last_name: string;

  sex?: string;

  date_of_birth?: string;

  active_status?: string;

  date_joined_uccz?: string;

  has_relative_in_uccz?: boolean;

  email?: string;   // ✅ NEW
  phone?: string;   // ✅ NEW
}

export interface UpdateMemberDTO {
  prefix?: string;
  first_name?: string;
  second_name?: string;
  last_name?: string;

  sex?: string;

  date_of_birth?: string;

  active_status?: string;

  date_joined_uccz?: string;

  has_relative_in_uccz?: boolean;

  email?: string;   
  phone?: string;  
}
