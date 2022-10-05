import { FC, useState, useEffect, useCallback, useRef , CSSProperties} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ConfirmButton from './UI/ConFirmButton';
import {
  updateCheckLists,
  deleteCheckList,
  updateCheckListStatus,
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
import { logInApi } from '@src/routers/APIs/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import type { CloseButtonProps } from 'react-toastify';
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

const businessData: { [key: string]: string } = {
  m: '대형마트',
  o: '온라인',
};


const pricing_toggle : CSSProperties = {
  backgroundColor: '#3FAED7',
  padding: '14px 5px',
  borderRadius: '30px',
  display: 'inline-block'
};

const input_display : CSSProperties = {
  display: 'none',
  backgroundColor: '#3FAED7',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '30px',
  cursor: 'pointer',
  userSelect: 'none'
};
// .pricing-toggle [name="pricing"] {
//   display: none
// }

const label : CSSProperties = {
  backgroundColor: '#3FAED7',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '30px',
  cursor: 'pointer',
  userSelect: 'none'
};

// .pricing-toggle input[type="radio"]+label {
//   background-color: #3FAED7;
//   color: white;
//   padding: 10px 20px;
//   border-radius: 30px;
//   cursor: pointer;
//   user-select: none;
// }

// .pricing-toggle input[type="radio"]:checked+label {
//   background-color: white;
//   color: #00008B;
// }


// .pricing-toggle {
//   background-color: #3FAED7;
//   padding: 14px 5px;
//   border-radius: 30px;
//   display: inline-block
// }

// .pricing-toggle [name="pricing"] {
//   display: none
// }

// .pricing-toggle input[type="radio"]+label {
//   background-color: #3FAED7;
//   color: white;
//   padding: 10px 20px;
//   border-radius: 30px;
//   cursor: pointer;
//   user-select: none;
// }

// .pricing-toggle input[type="radio"]:checked+label {
//   background-color: white;
//   color: #00008B;
// }




const CheckListSelectBox: FC<CheckListSelectBoxProps> = () => {
  const { checklistId } = useParams();
  const location = useLocation();
  let params = location.state as { isEdit: boolean; checklistId: string };
  const [customEmpty, setCustomEmpty] = useState<boolean>();
  const [basicEmpty, setBasicEmpty] = useState<boolean>();
  const [isEdit, setIsEdit] = useState(false);
  const [isModified, setIsModified] = useState<boolean>(false);
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
      console.log(params, params.isEdit);
      
      console.log('이전 페이지에서 오신듯함 ㅎ');
      setIsEdit(() => params.isEdit);
      // console.log(checklistBasicItems);
    } else {
      setIsEdit(()=>false)
      fetchData(checklistId);
    }
    return () => {
      window.removeEventListener('beforeunload', preventClose);
      if (isEdit) {
        console.log('unMounted');
        dispatch(setInitialStateWhenUnMounted());
      } else {
        console.log(
          'unMounted22',
          basicRef.current,
          customRef.current,
          isModified,
        );
        if (basicRef.current !== undefined && customRef.current !== undefined) {
          const basic = basicRef.current;
          const custom = customRef.current;
          const unMountUpdateStatus= async(basic : BasicProduct[], custom : CustomProduct[], CheckListId?: string) => {
            await updateCheckListStatus(basic, custom, checklistId)
          }
          unMountUpdateStatus(basic,custom,checklistId)
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
  const deleteItem = async (checklistId ?: string) => {
    await deleteCheckList(checklistId);
    navigate('/checklists');
  }
  const navigate = useNavigate();
  const optionList = ['m', 'o'];
  const [optionState, setOption] = useState<string>('m');
  
  
  const [checkedOffline, setCheckedOffline] = useState<boolean>(true);
  const [checkedOnline, setCheckedOnline] = useState<boolean>(false);
  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('클릭 전 optionState 는',optionState)
    setCheckedOffline( checkedOffline===true ? false : true)
    setCheckedOnline( checkedOnline===true ? false : true)
    setOption(()=>e.target.value);
    // setTimeout(()=>{console.log('클릭 후 optionState 는',optionState)}, 3000)
    console.log('클릭 후 optionState 는',optionState)
    
  };

  const customMsg = ({ closeToast } : CloseButtonProps) => (
    <div>
      <p>정말로 삭제하시겠습니까?</p>
      <button>네</button>
      <button onClick={closeToast}>아니오</button>
    </div>
  )
  const notify = () => toast.error(`정말로 삭제하시겠습니까?`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })
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

      <div className="m-5 flex items-center justify-between">
        {/* <select
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
        </select> */}


        <div className="pricing-toggle" >
          <input type="radio" id="pricing-toggle-offline" onChange={handleSelection}   name="toggle" value="m" checked={checkedOffline}/>
          <label className="radio-button" id="pricing-toggle-offline-radio" htmlFor="pricing-toggle-offline"> 오프라인</label>
        
          <input type="radio"  id="pricing-toggle-online"  onChange={handleSelection}   name="toggle" value="o" checked={checkedOnline} />
          <label className="radio-button" id="pricing-toggle-online-radio" htmlFor="pricing-toggle-online"> 온라인</label>
        </div>
  


        {!!isEdit ? (
          <div onClick={() => {
            saveCheckList()
            }}>
            <ConfirmButton />
          </div>
        ) : (
          <div className="m-3 grid grid-cols-2 items-center justify-center">
            <span
              onClick={() => {
                notify()
                // deleteCheckList(checklistId);
                // navigate(-1);
                return deleteItem(checklistId);
              }}
              className="text-sm"
            >
              <span className="ml-2 grid grid-cols-2">
                <Delete width="1rem" height="1rem" />
                삭제
              </span>
            </span>
            <ToastContainer position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover/>
            <span className=" ml-2 text-sm" onClick={() => setIsEdit(() => !isEdit)}>
              <span className="grid grid-cols-2">
                <Edit width="1rem" height="1rem" />
                수정
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
