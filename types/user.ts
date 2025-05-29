export enum UserProvider {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCK = 'BLOCK',
  DELETED = 'DELETED',
}

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  provider: UserProvider;
  status?: UserStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
