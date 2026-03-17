export interface CreateMemberMinistryDTO {
  member_id: number;
  ministry_id: number;
  membership_status?: string;
  joined_date?: string;
}

export interface UpdateMemberMinistryDTO {
  membership_status?: string;
  joined_date?: string;
}
