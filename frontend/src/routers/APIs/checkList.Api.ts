import axios from 'axios';

const API_URL = 'https://j7d108.p.ssafy.io/api/checklist';
const AUTH_TOKEN = 'token';

export type CheckList = {
  "checklistId" : number,
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
    const { data } = await axios.get(API_URL + '/list');
    console.log('getCheckLists : ', data);
    return data;
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
    const { data } = await axios.post<string>(API_URL + '/');
    console.log('makeEmptyCheckList : ', data);
  } catch (error) {
    
  }
};

/**
* ! get
* ? hhhhhhh
* TODO: 
* * 체크리스트 품목 선택 페이지 이동시 useEffect호출
* @parm : none;
* @return : none;
*/

export const checkListSelection = async () => {

};


export const getCheckList = async (checkListId ?: string) => {
  try {
    const {data} = await axios.get(API_URL + `/${checkListId}`);
    console.log("get CheckList by id : ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};