import axios from 'axios';

const API_URL = 'http://j7d108.p.ssafy.io:8080/api/checklist';
const AUTH_TOKEN = 'token';

type CheckList = {
  "chekclistId" : number,
  "regDate" : string
}

/**
* ! get
* * 페이지 랜더링시 호출, 리스트들을 출력
* @pram : none;
* @return : 
*/
export const getCheckLists = async () => {
  try {
    const { data } = await axios.get<CheckList[]>(API_URL + '/list', {
      headers: { Authorization: AUTH_TOKEN, },
    });
    console.log('getCheckLists : ', data);
  } catch (error) {
    
  }
}

/**
* ! post 
* * 체크리스트 생성 누를 시 호출됨, 이후 checkList add 페이지로 redirect
* @parm : none;
* @return : none;
*/
export const makeEmptyCheckList = async () => {
  try {
    const { data } = await axios.post<string>(API_URL + '/',{
      Headers: {
        Authorization: AUTH_TOKEN
      }
    });
    console.log('makeEmptyCheckList : ', data);
  } catch (error) {
    
  }
};

/**
* ! get
* ? hhhhhhh
* TODO: gkfdlf
* * 체크리스트 품목 선택 페이지 이동시 useEffect호출
* @parm : none;
* @return : none;
*/

export const checkListSelection = async () => {

};