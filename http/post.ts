import { axios } from '.';
import { CreatePostType } from '@/types/post';

const createPost = (data: CreatePostType) => {
  return axios.post('/posts', data);
};

const PostAPI = {
  createPost,
};

export { PostAPI };
