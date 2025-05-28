import { ChangePasswordType, LoginType, SignUpType } from '@/types/auth';
import { axios } from '.';

const signUp = (data: SignUpType) => {
  return axios.post('/auth/sign-up', data);
};

const login = (data: LoginType) => {
  return axios.post('/auth/login', data);
};

const changePassword = (data: ChangePasswordType) => {
  return axios.post('/auth/change-password', data);
};

const deleteAccount = () => {
  return axios.delete('/auth/account');
};

const AuthAPI = {
  signUp,
  login,
  changePassword,
  deleteAccount,
};

export { AuthAPI };
