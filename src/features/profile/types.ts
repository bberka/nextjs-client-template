export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}
