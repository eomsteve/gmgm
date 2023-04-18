import { client } from './client';
import type {
  CustomProduct,
  BasicProduct,
} from '@modules/CheckListProductList';


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
  const { data } = await client.get('/api/checklist/list/info');
  return data;
};

/**
 * ! post
 * * 체크리스트 생성 누를 시 호출됨, 이후 checkList add 페이지로 redirect
 * @parm : none;
 * @return : none;
 */
export const makeEmptyCheckList = async () => {
  await client.post<string>('/api/checklist/');
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
  const { data } = await client.get(`/api/checklist/${checkListId}`);
  return data;
};

export const updateCheckLists = async (
  checklistBasicItems: BasicProduct[],
  checklistCustomItems: CustomProduct[],
  checkListId?: string,
) => {
  const { data } = await client.put(`/api/checklist/info/${checkListId}`, {
    checklistBasicItems,
    checklistCustomItems,
  });
  checklistBasicItems = data.checklistBasicItems;
  return data;
};

export const updateCheckListStatusApi = async (
  checklistBasicItems: BasicProduct[],
  checklistCustomItems: CustomProduct[],
  checklistId?: string,
) => {
  try {
    const { data } = await client.put(`/api/checklist/status/${checklistId}`, {
      checklistBasicItems,
      checklistCustomItems,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addCheckList = async () => {
  const { data } = await client.post(`/api/checklist/`);
  return data;
};

export const deleteCheckList = async (checkListId?: string) => {
  const { data } = await client.delete(`/api/checklist/${checkListId}`);
  return data;
};

export const deleteEmptyCheckList = async (checkListId?: string) => {
  await client.delete(`/api/checklist/empty/${checkListId}`);
};
