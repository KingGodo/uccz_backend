export interface CreateMemberCouncilDTO {
  member_id: number;
  council_id: number;
  role?: string;
  joined_date?: string;
}

export interface UpdateMemberCouncilDTO {
  role?: string;
  joined_date?: string;
}
