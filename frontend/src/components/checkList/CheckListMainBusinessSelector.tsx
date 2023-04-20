import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ConfirmButton from './UI/ConFirmButton';
import {
  updateCheckLists,
  deleteCheckList,
  updateCheckListStatusApi,
} from '@apis/checkList.Api';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInitialState,
  setInitialStateWhenUnMounted,
  getCheckLists,
} from '@modules/CheckListProductList';
import type {
  CustomProduct,
  BasicProduct,
} from '@modules/CheckListProductList';
import type { RootState, AppDispatch } from '@modules/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Tooltip from '@components/tooltiptest';

// 리덕스
import ChecklistHeader from '@components/EmptyHeader';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import BasicProductCheckList from './CheckListBasicItems';
import CheckListCustomItems from './CheckListCustomItems';

// CSS
import './toggle.css';

interface CheckListSelectBoxProps {
  optionList: string[];
}

const CheckListSelectBox: FC<CheckListSelectBoxProps> = () => {
  const navigate = useNavigate();
  const { checklistId } = useParams();
  const location = useLocation();
  let params = location.state as { isEdit: boolean; checklistId: string };
  const [optionState, setOption] = useState<string>('m');

  const [customEmpty, setCustomEmpty] = useState<boolean>();
  const [basicEmpty, setBasicEmpty] = useState<boolean>();
  const [isEdit, setIsEdit] = useState(false);

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

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; //Chrome에서 동작하도록; deprecated
  };

  const basicRef = useRef();
  const customRef = useRef();
  useEffect(() => {
    return () => {
      basicRef.current = checklistBasicItems;
      customRef.current = checklistCustomItems;
    };
  }, [checklistBasicItems, checklistCustomItems]);

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    const fetchData = async (checklistId?: string) => {
      const data = await dispatch(getCheckLists(checklistId)).unwrap();

      if (data.empty) {
        setCustomEmpty(() => data.customEmpty);
        setBasicEmpty(() => data.basicEmpty);
        setIsEdit(() => true);
      } else {
        setCustomEmpty(() => data.customEmpty);
        setBasicEmpty(() => data.basicEmpty);
      }
      return data;
    };
    // routing 시 params
    if (params && params.isEdit) {
      setIsEdit(() => params.isEdit);
    } else {
      setIsEdit(() => false);
      fetchData(checklistId);
    }
    // 페이지 소멸시 행동
    return () => {
      window.removeEventListener('beforeunload', preventClose);

      if (isEdit) {
        console.log(isEdit);
        dispatch(setInitialStateWhenUnMounted());
      } else {
        if (basicRef.current !== undefined && customRef.current !== undefined) {
          const basic = basicRef.current;
          const custom = customRef.current;
          const unMountUpdateStatus = async (
            basic: BasicProduct[],
            custom: CustomProduct[],
            ChecklistId?: string,
          ) => {
            await updateCheckListStatusApi(basic, custom, ChecklistId);
          };
          unMountUpdateStatus(basic, custom, checklistId);
        }
      }
    };
  }, []);

  const saveCheckList = () => {
    if (typeof checklistId == 'string') {
      updateCheckLists(
        checklistBasicItems,
        checklistCustomItems,
        checklistId,
      ).then(data => {
        setBasicEmpty(() => data.basicEmpty);
        setCustomEmpty(() => data.customEmpty);
        dispatch(setInitialState(data));
      });
      setIsEdit(() => !isEdit);
    }
  };
  const deleteItem = async (checklistId?: string) => {
    await deleteCheckList(checklistId);
    navigate('/checklists');
  };

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(() => (optionState == 'm' ? 'o' : 'm'));
  };

  //toast component
  const CustomMsg = () => {
    return (
      <div>
        <p>정말로 삭제하시겠습니까?</p>
        <div className="flex justify-around ">
          <button
            className="m-1 w-[50%] rounded-md border-2 border-solid p-1 hover:bg-red-400"
            onClick={() => {
              deleteItem(checklistId);
            }}
          >
            네
          </button>
          <button className="m-1 w-[50%] rounded-md border-2 border-solid p-1 hover:bg-slate-400">
            아니오
          </button>
        </div>
      </div>
    );
  };

  const displayMsg = () => {
    toast.error(<CustomMsg />);
  };
  return (
    <>
      {isEdit ? (
        <ChecklistHeader
          title="장보기 목록 만들기"
          navigateRouter="checkLists"
        />
      ) : (
        <ChecklistHeader title="장보기 목록" navigateRouter="checkLists" />
      )}

      <div
        className={`mx-5 my-1 flex items-center ${
          isEdit ? ' justify-end ' : ' justify-between '
        }`}
      >
        {!isEdit && (
          <div className="flex items-center">
            <div className="switch-button m-3 ml-[3vw] ">
              <input
                onChange={handleSelection}
                className="switch-button-checkbox "
                type="checkbox"
              ></input>
              <label className="switch-button-label" htmlFor="">
                <span className="switch-button-label-span">오프라인</span>
              </label>
            </div>
            <span className=" right-[1.5rem]">
              <Tooltip />
            </span>
          </div>
        )}

        {isEdit ? (
          <div
            onClick={() => {
              saveCheckList();
              params.isEdit = true;
            }}
          >
            <ConfirmButton />
          </div>
        ) : (
          <div className="m-3 flex items-center justify-center">
            <span
              onClick={() => {
                displayMsg();
              }}
              className="flex text-sm"
            >
              <span className="ml-2 grid grid-cols-2">
                <Delete width="1rem" height="1rem" />
                삭제
              </span>
            </span>
            <span
              className=" ml-2 text-sm"
              onClick={() => setIsEdit(() => !isEdit)}
            >
              <span className="grid grid-cols-2">
                <Edit width="1rem" height="1rem" />
                수정
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-center p-0">
        <div className="flex">
          <span>가격 정보를 볼 수 있어요 🥰</span>
        </div>
        <div>
          <BasicProductCheckList
            isEdit={isEdit}
            BusinessType={optionState}
            isEmpty={basicEmpty}
            checklistId={checklistId}
          />
        </div>

        {isEdit ? <hr className="my-6 mx-[-1.25rem] mt-4 w-screen" /> : <br />}
        <span>가격 정보를 볼 수 없어요 😥</span>
        <CheckListCustomItems
          BusinessType={optionState}
          isEdit={isEdit}
          isEmpty={customEmpty}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={1}
        pauseOnHover
      />
    </>
  );
};

export default CheckListSelectBox;
