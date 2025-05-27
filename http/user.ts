import { axios } from '.';

const userMe = () => {
  return axios.get('/users/me');
};

const UserAPI = {
  userMe,
};

export { UserAPI };
