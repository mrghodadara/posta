export interface SignUpType {
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
}
