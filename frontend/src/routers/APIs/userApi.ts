import axios from 'axios';
import { client } from './client';

export type SignUpUserREQ = {
  email: string;
  pwd: string;
  name: string;
  gender: string;
  birthday: string;
  role?: string;
};

export type LogInUserREQ = {
  email: string;
  pwd: string;
};

export const signUpApi = async (signUpForm: SignUpUserREQ) => {
  const { data } = await client.post('/api/user/signup', signUpForm);
  return data;
};

export const checkEmailDuplicate = async (email: string) => {
  const { data } = await client.get(`/api/user/check/${email}`);
  return data;
};

export const logOutApi = async (email?: string) => {
  await client.post(`/api/user/logout`, email);
  localStorage.removeItem('jwtToken');
};

export default function authHeader(token: string) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
