import axios from 'axios';

export default function authHeader(token: string) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
