import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeBasicProducts } from '@modules/CheckListProductList';
import type { BasicProduct } from '@modules/CheckListProductList';
import type { RootState } from '@modules/store';
interface SelectedAreaProps {
  isEdit: boolean;
  checklistId : string;
}
 
const SelectedArea: FC <SelectedAreaProps> = (props) => {
  const  { isEdit, checklistId } = props;
  const navigate = useNavigate();
  const {checklistBasicItems} = useSelector((state : RootState) => {
    
    console.log(state, checklistId);
    return ({
      checklistBasicItems : state.persistedReducer.CheckListProductsReducer.checklistBasicItems
    })
  });
  const dispatch = useDispatch();
  const removeList = (product : BasicProduct)=>{
    dispatch(removeBasicProducts(product.basicProductId))
  }
  return (<>
  <div className="overflow-auto flex flex-wrap bg-blue-200 h-[10rem] w-full p-5 my-5">
    {checklistBasicItems && checklistBasicItems.map((x : BasicProduct) => {
        return (
          <span className="m-1 bg-white p-1 text-xs border-[1px] border-black" key={x.basicProductId} onClick={()=>{removeList(x)}}>
            {x.basicProductName}
          </span>
        )
      })}
      <div onClick={()=>{navigate(`/checklists/${checklistId}`, {state: {isEdit, checklistId}})}} className="border-black border-2"> 추가 완료 </div>
  </div>
  </>);
}
 
export default SelectedArea;