import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BasicBanner from './UI/BasicBanner';
import CustomBanner from './UI/CustomBanner';
import GotoCheckListSelection from './UI/GotoCheckListSelection';
import CheckListCard from './UI/CheckListCard';
import CustomInput from './UI/InputCustom';
import ConfirmButton from './UI/ConFirmButton';
import {
  getCheckList,
  updateCheckLists,
  deleteCheckList,
  updateCheckListStatus,
} from '@apis/checkList.Api';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInitialState,
  setInitialStateWhenUnMounted,
  updateCustomProductStatus,
  updateBasicProductsStatus,
  getCheckLists,
} from '@modules/CheckListProductList';
import type {
  CustomProduct,
  BasicProduct,
} from '@modules/CheckListProductList';
import type { RootState, AppDispatch } from '@modules/store';
import { logInApi } from '@src/routers/APIs/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// 리덕스
import ChecklistHeader from '@components/EmptyHeader';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';

import BasicProductCheckList from './CheckListBasicItems';
import CustomProductCheckList from './CheckListCustomItems';
import CheckListCustomItems from './CheckListCustomItems';
interface CheckListSelectBoxProps {
  optionList: string[];
}

const businessData: { [key: string]: string } = {
  m: '대형마트',
  o: '온라인',
};

const CheckListSelectBox: FC<CheckListSelectBoxProps> = props => {
  const { checklistId } = useParams();
  const location = useLocation();
  const params = location.state as { isEdit: boolean; checklistId: string };
  const [customEmpty, setCustomEmpty] = useState<boolean>();
  const [basicEmpty, setBasicEmpty] = useState<boolean>();
  const [isEdit, setIsEdit] = useState(false);
  const [isModified, setIsModified] = useState<boolean>(false);
  // const [checklistCustomItems, setChecklistCustomItems] = useState<CustomProduct[]>([]);
  // const [checklistBasicItems, setChecklistBasicItems] = useState<BasicProduct[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { checklistCustomItems, checklistBasicItems } = useSelector(

    (state: RootState) => {
      
      return {
        checklistCustomItems:
          state.persistedReducer.CheckListProductsReducer.checklistCustomItems,
        checklistBasicItems:
          state.persistedReducer.CheckListProductsReducer.checklistBasicItems,
      };
    },
  );
  console.log(checklistCustomItems, checklistBasicItems);
  
  
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; //Chrome에서 동작하도록; deprecated
  };
  
  const basicRef = useRef();
  const customRef = useRef();
  useEffect(() => {
    return () => {
      setIsModified(true);
      basicRef.current = checklistBasicItems
      customRef.current =checklistCustomItems
      console.log('update', basicRef.current, customRef.current);
    }
  },[checklistBasicItems, checklistCustomItems])
  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    const fetchData = async (checklistId?: string) => {
      const data = await dispatch(getCheckLists(checklistId)).unwrap();
      if (data.empty) {
        console.log('empty checklist', data.customEmpty);
        setCustomEmpty(() => data.customEmpty);
        setBasicEmpty(() => data.basicEmpty);
        setIsEdit(() => true);
      } else {
        setCustomEmpty(() => data.customEmpty);
        setBasicEmpty(() => data.basicEmpty);
        console.log(data);
      }
    };
    if (params && params.isEdit) {
      console.log('이전 페이지에서 오신듯함 ㅎ');
      setIsEdit(() => params.isEdit);
      // console.log(checklistBasicItems);
    } else {
      fetchData(checklistId);
    }
    return () => {
      window.removeEventListener('beforeunload', preventClose);
      if (isEdit) {
        console.log('unMounted');
        dispatch(setInitialStateWhenUnMounted());
      } else {
        console.log('unMounted22',basicRef.current, customRef.current, isModified);
        if (basicRef.current !== undefined && customRef.current !== undefined) {
          updateCheckListStatus(basicRef.current,  customRef.current, checklistId)
        }
      }
    };
  }, []);

  const saveCheckList = async () => {
    if (typeof checklistId == 'string') {
      await updateCheckLists(
        checklistBasicItems,
        checklistCustomItems,
        checklistId,
      ).then(data => {
        console.log(data);
        dispatch(setInitialState(data));
      });
      setIsEdit(() => !isEdit);
    }
  };


  const navigate = useNavigate();
  const optionList = ['m', 'o'];
  const [optionState, setOption] = useState<string>('m');

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };
  return (
    <>
      {isEdit ? (
        <ChecklistHeader title="장보기 목록 만들기" />
      ) : (
        <ChecklistHeader title="장보기 목록" />
      )}

      <div className="m-5 flex items-center justify-between">
        <select
          onChange={handleSelection}
          name="selectBox"
          className="form-select form-select-sm m-3 block w-[100px] max-w-[25vw] rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-2 py-1 text-xs font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          aria-label=".form-select-sm example"
        >
          {optionList.map((option, index) => (
            <option value={option} key={index}>
              {businessData[option]}
            </option>
          ))}
        </select>
        {!!isEdit ? (
          <div onClick={() => saveCheckList()}>
            <ConfirmButton />
          </div>
        ) : (
          <div className="m-3 grid grid-cols-2 items-center justify-center">
            <span className="text-sm" onClick={() => setIsEdit(() => !isEdit)}>
              <span className="grid grid-cols-2">
                <Edit width="1rem" height="1rem" />
                수정
              </span>
            </span>
            <span
              onClick={() => {
                deleteCheckList(checklistId);
                navigate(-1);
              }}
              className="text-sm"
            >
              <span className="ml-2 grid grid-cols-2">
                <Delete width="1rem" height="1rem" />
                삭제
              </span>
            </span>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center p-0">
        <span>가격 정보를 볼 수 있어요 🥰</span>
        <BasicProductCheckList
          isEdit={isEdit}
          BusinessType={optionState}
          isEmpty={basicEmpty}
          checklistId={checklistId}
        />

        {isEdit ? (
          <div className="m-3 w-[86vw] border-t-2 border-dashed border-gray-300"></div>
        ) : (
          <br />
        )}
        <span>가격 정보를 볼 수 없어요 😥</span>
        <CheckListCustomItems
          BusinessType={optionState}
          isEdit={isEdit}
          isEmpty={customEmpty}
        />
      </div>
    </>
  );
};

export default CheckListSelectBox;
