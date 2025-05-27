import { LoginType, SignUpType } from '@/types/auth';
import { axios } from '.';

const signUp = (data: SignUpType) => {
  return axios.post('/auth/sign-up', data);
};

const login = (data: LoginType) => {
  return axios.post('/auth/login', data);
};

const authMe = () => {
  return axios.get('/auth/me');
};

const AuthAPI = {
  signUp,
  login,
  authMe,
};

export { AuthAPI };
