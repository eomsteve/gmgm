import { FC, useState, useEffect } from 'react';
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
} from '@modules/CheckListProductList';
import type {
  CustomProduct,
  BasicProduct,
} from '@modules/CheckListProductList';
import type { RootState } from '@modules/store';
import { logInApi } from '@src/routers/APIs/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// 리덕스
import ChecklistHeader from '@components/EmptyHeader';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';

import BasicProductCheckList from './CheckListBasicItems';
import CustomProductCheckList from './CheckListCustomItems';
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
  const [customEmpty, setCustomEmpty] = useState<boolean>();
  const [basicEmpty, setBasicEmpty] = useState<boolean>();
  const params = location.state as { isEdit: boolean; checklistId: string };
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { checklistCustomItems, checklistBasicItems } = useSelector(
    (state: RootState) => {
      console.log(state);
      return {
        checklistCustomItems:
          state.persistedReducer.CheckListProductsReducer.checklistCustomItems,
        checklistBasicItems:
          state.persistedReducer.CheckListProductsReducer.checklistBasicItems,
      };
    },
  );
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; //Chrome에서 동작하도록; deprecated
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    if (params && params.isEdit) {
      console.log('이전 페이지에서 오신듯함 ㅎ');
      setIsEdit(() => params.isEdit);
    } else {
      const fetchData = async (checklistId?: string) => {
        const data = await getCheckList(checklistId);
        if (data.empty) {
          console.log('empty checklist', data.customEmpty);
          dispatch(setInitialStateWhenUnMounted());
          setCustomEmpty(() => data.customEmpty);
          setBasicEmpty(() => data.basicEmpty);
          setIsEdit(() => true);
        } else {
          console.log();
          setCustomEmpty(() => data.customEmpty);
          setBasicEmpty(() => data.basicEmpty);
          dispatch(setInitialState(data));
        }
      };
      fetchData(checklistId);
    }
    console.log(checklistId);

    const saveCheckListWhenUnmounted = async () => {
      console.log('status save function work');
      const response = await updateCheckListStatus(
        checklistBasicItems,
        checklistCustomItems,
        checklistId,
      );
    };
    return () => {
      window.removeEventListener('beforeunload', preventClose);
      if (isEdit) {
        console.log('unMounted');
        dispatch(setInitialStateWhenUnMounted());
      } else {
        saveCheckListWhenUnmounted();
        console.log('unMounted22');
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
        <ChecklistHeader title="장보기 리스트 만들기" />
      ) : (
        <ChecklistHeader title="장보기 리스트" />
      )}

      <div className="flex items-center justify-between p-5">
        <select
          onChange={handleSelection}
          name="selectBox"
          className="form-select form-select-sm my-3 block w-[100px] max-w-[25vw] rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-2 py-1 text-xs font-normal text-gray-700 shadow-md transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
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
          <div>
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
              {' '}
              ⛔삭제{' '}
            </span>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-center p-0">
        <BasicProductCheckList
          isEdit={isEdit}
          BusinessType={optionState}
          isEmpty={basicEmpty}
        />

        {!!isEdit ? (
          <div className="m-2 w-[90vw] border-t-2 border-dashed border-black"></div>
        ) : (
          <br />
        )}

        <CustomProductCheckList
          isEdit={isEdit}
          BusinessType={optionState}
          isEmpty={customEmpty}
        />
      </div>
    </>
  );
};

export default CheckListSelectBox;
