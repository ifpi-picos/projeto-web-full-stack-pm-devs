export interface User {
  id: string;
  name: string;
  username: string; 
  email: string;
  password: string; 
  profile_image?: string;
  created_at: Date;
}