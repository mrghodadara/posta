import { UserType } from '@/types/user';
import { axios } from '.';

const userMe = () => {
  return axios.get('/users/me');
};

const updateUser = (data: Partial<UserType>) => {
  return axios.patch('/users', data);
};

const UserAPI = {
  userMe,
  updateUser,
};

export { UserAPI };
