import  React, { FC, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateBasicProductsStatus,removeBasicProducts } from '@modules/CheckListProductList'
import {useDispatch, useSelector} from 'react-redux'
import type { RootState } from '@modules/store';
import { atCheckList } from '@apis/detail'
import type {
  CustomProduct,
  BasicProduct,
} from '@modules/CheckListProductList';
interface CheckListProps{
  isEdit: boolean;
  customProductName?: string;
  basicProductName?: string;
  status: boolean;
  productId? : number;
  businessType : string;
}
const CheckListCard : FC<CheckListProps> = (props) =>{
  const {customProductName, basicProductName, isEdit, status, businessType, productId} = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { checklistCustomItems, checklistBasicItems } = useSelector(
    (state: RootState) => {
      // console.log(state);
      return {
        checklistCustomItems:
          state.persistedReducer.CheckListProductsReducer.checklistCustomItems,
        checklistBasicItems:
          state.persistedReducer.CheckListProductsReducer.checklistBasicItems,
      };
    },
  );
  const handleCheckState = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setIsChecked(!isChecked);
    dispatch(updateBasicProductsStatus(e.target.id))
  }
  useEffect(() => {
    setIsChecked(status)
  },[])
  return (
    <>
      <div className="m-2 py-2 ml-3 shadow-md container center grid grid-cols-6 w-[90vw] px-2 lg:py-0 border-black items-center ">
      <input disabled={isEdit} onChange={handleCheckState} className="ml-4 h-[20px] w-[20px]" checked={isChecked} type="checkbox" id={customProductName || basicProductName} />
      <label className={`col-span-3 flex items-center p-1 ${!isChecked? '' : 'line-through text-gray-500'}`} htmlFor={customProductName || basicProductName}><span> {customProductName || basicProductName}</span></label>
      <div onClick={()=>{navigate('/')}} className="flex items-center justify-center">
        {basicProductName && <span> 추세 </span>}
      </div>
      <div className="flex items-center justify-center">
        {basicProductName && (isEdit ? <span onClick={()=>{dispatch(removeBasicProducts(productId))}} > ⛔ </span> : <span onClick={()=>{navigate(`/detail/product/${productId}/business/${businessType}`)}}> 📈 </span>)}
        {customProductName && isEdit && <span> ⛔ </span>}
      </div>
    </div>
    </>
  );
};

export default CheckListCard;