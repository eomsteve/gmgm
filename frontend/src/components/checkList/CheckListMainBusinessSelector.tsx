import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasicBanner from './UI/BasicBanner';
import CustomBanner from './UI/CustomBanner';
import GotoCheckListSelection from './UI/GotoCheckListSelection';
import CheckListCard from './UI/CheckListCard';
import CustomInput from './UI/InputCustom';
import ConfirmButton from './UI/ConFirmButton';
import { getCheckList } from '@apis/checkList.Api'

import { useSelector } from 'react-redux';
import type {CustomProduct, BasicProduct } from '@modules/CheckListProductList'
import type { RootState } from '@modules/store';


interface CheckListSelectBoxProps {
  optionList: string[];
}

const businessData: { [key: string]: string } = {
  m: '대형마트',
  s: '슈퍼마켓',
  o: '온라인',
};

const CheckListSelectBox: FC<CheckListSelectBoxProps> = props => {
  const { checklistId } = useParams();
  useEffect(() => {
    const fetchData = async(checklistId ?: string) => {
      const data = await getCheckList(checklistId);
      if (data.empty){
        console.log('empty checklist');        
      }
    } 
    fetchData(checklistId)
    console.log(checklistId);
  },[])
  const { checklistCustomItems,checklistBasicItems } = useSelector((state: RootState) => {
    console.log(state);
    
    return {checklistCustomItems : state.persistedReducer.CheckListProductsReducer.checklistCustomItems ,checklistBasicItems : state.persistedReducer.CheckListProductsReducer.checklistBasicItems  }
  })
  const navigate = useNavigate();
  const optionList = ['m', 's', 'o'];
  const [optionState, setOption] = useState<string>('m');
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  const [isCustom, setIsCustom] = useState<boolean>(false);
  const testList = [1];

  return (
    <>
    <div className="flex justify-between">
      <select
        onChange={handleSelection}
        // 여기 props 로 받아와야함.
        // defaultValue="m"
        name="selectBox"
        className="form-select form-select-sm my-3 block max-w-[25vw] rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-2 py-1 text-xs font-normal text-gray-700 shadow-md transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
        aria-label=".form-select-sm example"
        >
        {optionList.map((option, index) => (
          <option value={option} key={index}>
            {businessData[option]}
          </option>
        ))}
      </select>
          <ConfirmButton checkListId={checklistId} checklistCustomItems={checklistCustomItems} checklistBasicItems={checklistBasicItems}/>
        </div>
      <div className="flex w-full flex-col items-center justify-center p-0">
        { !!!checklistBasicItems && <BasicBanner />}
        {checklistBasicItems.map((products : BasicProduct) => {
          return (
            <div key={products.basicProductId}>
              <CheckListCard customProductName={products.basicProductName} />
            </div>
          );
        })}
        {/* <CheckListCard /> */}
        <div
          onClick={() => {
            navigate('/checklist/selection');
          }}
        >
          {/* <GotoCheckListSelection /> */}
        </div>
        <div className="m-2 w-[90vw] border-t-2 border-dashed border-black"></div>
        <div
          onClick={() => {
            setIsCustom(true);
          }}
        >
          {!!!checklistCustomItems && <CustomBanner />}
        </div>
        {
          checklistCustomItems.map((product : CustomProduct) => {
            return <CheckListCard customProductName={product.customProductName}  />
          })
        }
        {isCustom && <CustomInput />}
      </div>
    </>
  );
};

export default CheckListSelectBox;
