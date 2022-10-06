import { FC, useState, useEffect,  useRef , CSSProperties} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ConfirmButton from './UI/ConFirmButton';
import {
  updateCheckLists,
  deleteCheckList,
  updateCheckListStatus,
  deleteEmptyCheckList
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
import Tooltip from '@components/tooltiptest'


// 리덕스
import ChecklistHeader from '@components/EmptyHeader';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import BasicProductCheckList from './CheckListBasicItems';
import CheckListCustomItems from './CheckListCustomItems';

// CSS
import './toggle.css';
import { data } from '../charts/TestChart';

interface CheckListSelectBoxProps {
  optionList: string[];
}




const CheckListSelectBox: FC<CheckListSelectBoxProps> = () => {
  const { checklistId } = useParams();
  const location = useLocation();
  let params = location.state as { isEdit: boolean; checklistId: string };
  const [customEmpty, setCustomEmpty] = useState<boolean>();
  const [basicEmpty, setBasicEmpty] = useState<boolean>();
  const [isEdit, setIsEdit] = useState(false);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [imGoingToSelect, setImGoingToSelect] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
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

  const basicRef = useRef();
  const customRef = useRef();
  const dataRef = useRef();
  useEffect(() => {
    return () => {
      setIsModified(true);
      
      basicRef.current = checklistBasicItems;
      customRef.current = checklistCustomItems;
      console.log('update', basicRef.current, customRef.current);
    };
  }, [checklistBasicItems, checklistCustomItems]);
  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    const fetchData = async (checklistId?: string) => {
      const data = await dispatch(getCheckLists(checklistId)).unwrap();
      console.log(data);
      
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
      return data;
    };
    if (params && params.isEdit) {
      console.log(params, params.isEdit);
      setIsEdit(() => params.isEdit);
      // console.log(checklistBasicItems);
    } else {
      setIsEdit(() => false);
      fetchData(checklistId);
    }
    return () => {
      window.removeEventListener('beforeunload', preventClose);
      console.log("unmount is Edit? : ", isEdit);
      
      if (isEdit) {
        console.log('unMounted');
        dispatch(setInitialStateWhenUnMounted());
      } else {
        console.log(
          'unMounted22',
        );
        if (basicRef.current !== undefined && customRef.current !== undefined) {
          const basic = basicRef.current;
          const custom = customRef.current;
          const unMountUpdateStatus = async (
            basic: BasicProduct[],
            custom: CustomProduct[],
            CheckListId?: string,
          ) => {
            await updateCheckListStatus(basic, custom, checklistId);
          };
          unMountUpdateStatus(basic, custom, checklistId);
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
        setBasicEmpty(()=>data.basicEmpty)
        setCustomEmpty(()=>data.customEmpty);
        dispatch(setInitialState(data));
      });
      setIsEdit(() => !isEdit);
    }
  };
  const deleteItem = async (checklistId?: string) => {
    await deleteCheckList(checklistId);
    navigate('/checklists');
  };
  const navigate = useNavigate();
  const [optionState, setOption] = useState<string>('m');
  
  
  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {

    setOption(()=> (optionState == 'm') ? 'o': 'm');
    
  };
  const CustomMsg = () => {
    return (
      <div>
        <p>정말로 삭제하시겠습니까?</p>
        <div className="flex justify-around ">
          <button
            className="m-1 w-[50%] p-1 border-solid border-2 rounded-md hover:bg-red-400"
            onClick={() => {
              deleteItem(checklistId);
            }}
          >
            네
          </button>
          <button className="m-1 w-[50%] p-1 border-solid border-2 rounded-md hover:bg-slate-400">아니오</button>
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

       <div className={`mx-5 my-1 flex items-center ${isEdit ?' justify-end ':' justify-between '}`}>
       {!isEdit &&  <div className="switch-button m-3 ml-[3vw] ">
        <input
          onChange={handleSelection}
          className="switch-button-checkbox "
          type="checkbox"
        ></input>
        <label className="switch-button-label" htmlFor="">
          <span className="switch-button-label-span">오프라인</span>
        </label>
      </div>}


        {!!isEdit ? (
          <div
            onClick={() => {
              saveCheckList();
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
              className="text-sm flex"
            >
              <span className="ml-2 grid grid-cols-2">
                <Delete width="1rem" height="1rem" />
                삭제
              </span>
            </span>
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
        <span>가격 정보를 볼 수 있어요 🥰</span><span className="mx-2 absolute right-[1.5rem]"><Tooltip /></span>
        </div>
        <div onClick={()=>{
          setImGoingToSelect(true)
        }}>

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
    </>
  );
};

export default CheckListSelectBox;
