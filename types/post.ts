import { UserType } from './user';
export interface PostType {
  _id: string;
  user: UserType;
  title: string;
  content: string;
  slug: string;
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CreatePostType {
  title: string;
  content: string;
  tags: string[];
}
