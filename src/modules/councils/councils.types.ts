export interface CreateCouncilDTO {
  church_id: number;
  name?: string;
  description?: string;
}

export interface UpdateCouncilDTO {
  name?: string;
  description?: string;
}
