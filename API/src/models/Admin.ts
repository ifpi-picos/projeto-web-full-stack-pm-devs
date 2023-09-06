export interface Admin {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phoneNumber: string;
  created_at: Date;
  isAdmin: boolean;
}