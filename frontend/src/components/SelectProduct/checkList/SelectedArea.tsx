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
  <div className="w-full h-full bg-[#b3d1e6] flex flex-col">
    <div className="mt-3 mx-3 text-lg font-bold">
      나의 즐겨찾기 리스트
    </div>
    <div className="w-screen h-1/2 flex flex-wrap overflow-auto items-start p-3">
      {checklistBasicItems && checklistBasicItems.map((x : BasicProduct) => {
          return (
            <span className="bg-white m-1 px-2 py-1 rounded-full text-sm" key={x.basicProductId} onClick={()=>{removeList(x)}}>
              {x.basicProductName}
            </span>
          )
        })}
    </div>
    <span 
      onClick={()=>{navigate(`/checklists/${checklistId}`, {state: {isEdit, checklistId}})}}
      className="relate bottom-0 right-0 self-end w-auto bg-white mb-2 mx-2 px-3 py-1 border border-black rounded-full"> 
      다음 &gt;
    </span>
  </div>
  </>);
}
 
export default SelectedArea;