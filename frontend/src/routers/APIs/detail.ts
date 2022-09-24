import axios from 'axios';

const API_URL = 'http://j7d108.p.ssafy.io:8080/api/';
// 가지고 있다 치고 
const AUTH_TOKEN = 'token';

type CheckList = {
  "chekclistId" : number,
  "regDate" : string
}

const getCheckLists = async () => {
  try {
    const { data } = await axios.get<CheckList[]>(API_URL + '/list', {
      headers: { Authorization: AUTH_TOKEN, },
    });

  } catch (error) {
    
  }
}