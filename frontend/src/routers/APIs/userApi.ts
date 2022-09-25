import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './authHeader';
const API_URL = 'http://j7d108.p.ssafy.io:8080/api/user';


export type SignUpUserREQ = {
  email: string;
  pwd: string;
  name: string;
  gender: string;
  birthday: string;
  role: string;
};

export type LogInUserREQ = {
  email: string;
  pwd: string;
};
export const signUpApi = async (signUpForm: SignUpUserREQ) => {
  try {
    const { data } = await axios.post(API_URL + '/signup', signUpForm);
    
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return error.message;
    } else {
      console.log(error);
      return 'unexpected error occurred';
    }
  }
};

// {
//   "email": "sheom@email.com",
//   "pwd": "123123",
//   "name": "user",
//   "gender": "m",
//   "birthday": "1999-01-01",
//   "role" : "u"
// }

export const logInApi = async (logInForm: LogInUserREQ) => {
  try {
    const { data } = await axios.post(API_URL + '/login', logInForm);
    localStorage.setItem("jwtToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return error.message;
    } else {
      console.log(error);
      return 'unexpected error occurred';
    }
  }
};
