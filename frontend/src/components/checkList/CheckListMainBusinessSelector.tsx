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
  const [isEmpty, setIsEmpty] = useState<boolean>();
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
          console.log('empty checklist');
          dispatch(setInitialStateWhenUnMounted());
          setIsEmpty(() => true);
          setIsEdit(() => true);
        } else {
          console.log();
          dispatch(setInitialState(data));
        }
      };
      fetchData(checklistId);
    }
    console.log(checklistId);

    const saveCheckListWhenUnmounted = async () =>{
      console.log('status save function work');
      
      const response = await updateCheckListStatus(
        checklistBasicItems,
        checklistCustomItems,
        checklistId,
      );
    }
    return  () => {
      window.removeEventListener('beforeunload', preventClose);
      if (isEdit) {
        console.log('unMounted');
        dispatch(setInitialStateWhenUnMounted());
      } else {
        saveCheckListWhenUnmounted()
        console.log('unMounted22');
        // dispatch(setInitialStateWhenUnMounted());
      }
    };
  }, []);
  // useEffect(() => {
  //   (() => {
  //     window.addEventListener('beforeunload', preventClose);
  //   })();
  //   const saveCheckListWhenUnmounted = async () =>{
  //     console.log('status save function work');
      
  //     const response = await updateCheckListStatus(
  //       checklistBasicItems,
  //       checklistCustomItems,
  //       checklistId,
  //     );
  //   }
  //   return () => {
  //     saveCheckListWhenUnmounted()
  //     console.log('unMounted33');
  //     window.removeEventListener('beforeunload', preventClose);
  //   };
  // }, []);
  
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

  const [isCustom, setIsCustom] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <select
          onChange={handleSelection}
          // 여기 props 로 받아와야함.
          // defaultValue="m"
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
              {' '}
              🔨수정{' '}
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
        {isEmpty && (
          <div
            onClick={() => {
              console.log(checklistId);

              navigate('/checklist/selection', {
                state: { isEdit, checklistId },
              });
            }}
          >
            <BasicBanner />
          </div>
        )}
        {checklistBasicItems.map((products: BasicProduct) => {
          return (
            <div key={products.basicProductId}>
              <CheckListCard
                basicProductName={products.basicProductName}
                isEdit={isEdit}
                status={products.status}
              />
            </div>
          );
        })}
        {isEdit && !isEmpty && checklistBasicItems && (
          <div
            onClick={() => {
              console.log(checklistId);

              navigate('/checklist/selection', {
                state: { isEdit, checklistId },
              });
            }}
          >
            <div className="m-0 text-[1.5rem]">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        )}
        {!!isEdit ? (
          <div className="m-2 w-[90vw] border-t-2 border-dashed border-black"></div>
        ) : (
          <br />
        )}
        <div
          onClick={() => {
            setIsCustom(true);
          }}
        >
          {isEmpty && <CustomBanner />}
        </div>
        {checklistCustomItems.map((product: CustomProduct) => {
          return (
            <CheckListCard
              customProductName={product.customProductName}
              isEdit={isEdit}
              status={product.status}
            />
          );
        })}
        {isCustom && <CustomInput />}
      </div>
    </>
  );
};

export default CheckListSelectBox;
