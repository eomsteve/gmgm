import axios from 'axios';
import { useSelector } from 'react-redux';
import type {
  CustomProduct,
  BasicProduct,
} from '@modules/CheckListProductList';
import type { RootState } from '@modules/store';
import { logInApi } from './userApi';
const API_URL = 'https://j7d108.p.ssafy.io/api/checklist';
const AUTH_TOKEN = 'token';

export type CheckList = {
  checklistId: number;
  regDate: string;
  itemInfos: {
    productName: string;
    status: boolean;
  }[];
};

/**
 * ! get
 * * 페이지 랜더링시 호출, 리스트들을 출력
 * @pram : none;
 * @return :
 */
export const getCheckLists = async () => {
  try {
    const { data } = await axios.get(API_URL + '/list/info');
    console.log('getCheckLists : ', data);
    return data;
  } catch (error) {}
};

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
  } catch (error) {}
};

/**
 * ! get
 * ? hhhhhhh
 * TODO:
 * * 체크리스트 품목 선택 페이지 이동시 useEffect호출
 * @parm : none;
 * @return : none;
 */

export const checkListSelection = async () => {};

/**
 * * 체크리스트 조회, 수정페이지
 * @param checkListId
 * @returns
 */
export const getCheckList = async (checkListId?: string) => {
  try {
    const { data } = await axios.get(API_URL + `/${checkListId}`);
    console.log('get CheckList by id : ', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCheckLists = async (
  checklistBasicItems: BasicProduct[],
  checklistCustomItems: CustomProduct[],
  checkListId?: string,
) => {
  try {
    const { data } = await axios({
      url: API_URL + `/info/${checkListId}`,
      method: 'put',
      data: {
        checklistBasicItems,
        checklistCustomItems,
      },
    });
    console.log('updated to:', data);
    checklistBasicItems = data.checklistBasicItems;
    return data;
  } catch (error) {}
};

export const updateCheckListStatus = async (
  checklistBasicItems: BasicProduct[],
  checklistCustomItems: CustomProduct[],
  checklistId?: string,
) => {
  console.log('????', checklistBasicItems, checklistCustomItems);

  try {
    const { data } = await axios({
      url: API_URL + `/status/${checklistId}`,
      method: 'put',
      data: {
        checklistBasicItems,
        checklistCustomItems,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addCheckList = async () => {
  try {
    const { data } = await axios({
      url: API_URL + `/`,
      method: 'post',
    });
    console.log(data);
    return data;
  } catch (error) {}
};

export const deleteCheckList = async (checkListId?: string) => {
  try {
    const { data } = await axios({
      url: API_URL + `/${checkListId}`,
      method: 'delete',
    });
    console.log(data);
    return data;
  } catch (error) {}
};

export const deleteEmptyCheckList = async (checkListId?: string) => {
  console.log(checkListId);

  try {
    const data = await axios({
      url: API_URL + `/empty/${checkListId}`,
      method: 'delete',
    });
    console.log('삭제됨');
  } catch (error) {
    console.error(error);
  }
};
