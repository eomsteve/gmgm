import axios from 'axios';

export default function authHeader(token: string) {
  if (token) {
    console.log('adding header at token,', token);
    
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
