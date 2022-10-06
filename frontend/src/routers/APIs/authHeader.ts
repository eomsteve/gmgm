import axios from 'axios';

export default function authHeader(token: string | null) {
  if (token != null) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
