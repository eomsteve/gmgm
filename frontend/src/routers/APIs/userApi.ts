import axios from 'axios';
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
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return error.message;
    } else {
      console.error(error);
      return 'unexpected error occurred';
    }
  }
};

export const checkEmailDuplicate = async (email: string) => {
  try {
    const { data } = await axios.get(API_URL + `/check/${email}`);
    return data;
  } catch (error) {}
};


export default function authHeader(token: string) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const logInApi = async (logInForm: LogInUserREQ) => {
  try {
    const { data } = await axios.post(API_URL + '/login', logInForm);
    localStorage.setItem('jwtToken', data.accessToken);
    authHeader(data.accessToken);
    return { status: true, data: data.accessToken };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return error.message;
    } else {
      console.error(error);
      return 'unexpected error occurred';
    }
  }
};

export const logOutApi = async (email?: string) => {
  try {
    const { data } = await axios({
      url: API_URL + `/logout`,
      method: 'POST',
      data: { email },
    });
    localStorage.removeItem('jwtToken');
    // localStorage.clear()
  } catch (error) {}
};
