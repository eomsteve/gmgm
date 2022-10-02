import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './authHeader';
const API_URL = 'https://j7d108.p.ssafy.io/api/user';


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
  
  try {
    const { data } = await axios.post(API_URL + '/signup', signUpForm);
    console.log(data);
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

export const checkEmailDuplicate = async (email: string) => {
  try {
    const { data } = await axios.get(API_URL + `/check/${email}`)
    return data;
  } catch (error) {
    
  }

}

// {
//   "email": "sheom@email.com",
//   "pwd": "123123",
//   "name": "user",
//   "gender": "m",
//   "birthday": "1999-01-01",
//   "role" : "u"
// }

export default function authHeader(token: string) {
  if (token) {
    console.log('adding header at token,', token);
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const logInApi = async (logInForm: LogInUserREQ) => {
  try {
    const { data } = await axios.post(API_URL + '/login', logInForm);
    localStorage.setItem("jwtToken", data.accessToken);
    authHeader( data.accessToken )
    return {status : true, data : data.accessToken};
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

export const logOutApi = async (email : string) =>{
  try {
    const { data } = await axios({
      url: API_URL + `/logout`,
      method: 'POST',
      data :{email,
      }
    });
    localStorage.removeItem('jwtToken')
  } catch (error) {
    
  }
}

