import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBasicProducts } from '@modules/CheckListProductList';
import type { BasicProduct } from '@modules/CheckListProductList';
import type { RootState } from '@modules/store';
interface SelectedAreaProps {
  
}
 
const SelectedArea: FC = () => {
  const {checklistBasicItems} = useSelector((state : RootState) => {
    
    console.log(state);
    return ({
      checklistBasicItems : state.persistedReducer.CheckListProductsReducer.checklistBasicItems
    })
  });
  const dispatch = useDispatch();
  const removeList = (product : BasicProduct)=>{
    dispatch(removeBasicProducts(product))
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
  </div>
  </>);
}
 
export default SelectedArea;