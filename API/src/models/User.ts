export interface User {
  id: string;
  name: string;
  username: string; 
  email: string;
  password: string;
  confirmPassword?: string;
  profile_image?: string;
  isAdmin: boolean;
  created_at: Date;
}