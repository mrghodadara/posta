import { axios } from '.';
import { CreatePostType } from '@/types/post';

const createPost = (data: CreatePostType) => {
  return axios.post('/posts', data);
};

const getPost = (id: string) => {
  return axios.get(`/posts/${id}`);
};

const editPost = (id: string, data: Partial<CreatePostType>) => {
  return axios.patch(`/posts/${id}`, data);
};

const deletePost = (id: string) => {
  return axios.delete(`/posts/${id}`);
};

const getPostsByUserId = (userId: string) => {
  return axios.get(`/posts/user/${userId}`);
};

const PostAPI = {
  createPost,
  getPost,
  editPost,
  deletePost,
  getPostsByUserId,
};

export { PostAPI };
