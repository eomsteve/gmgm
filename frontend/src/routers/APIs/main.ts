import axios from 'axios';

const API_URL = 'https://j7d108.p.ssafy.io/api/main';

export const loadMain  = async () => {
  try {
    const data = await axios({
      url: API_URL,
      method: 'GET',
    })
    console.log(data);
    return data;
  } catch (error) {
    
  }
};
