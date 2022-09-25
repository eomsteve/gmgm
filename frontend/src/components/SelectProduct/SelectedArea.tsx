import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeGoods } from '../../modules/FavoriteProductList';
import type { RootState } from '../../modules/store';
interface SelectedAreaProps {
  
}
 
const SelectedArea: FC<SelectedAreaProps> = () => {
  const {goods} = useSelector((state : RootState) => {
    
    console.log(state);
    return ({
      goods : state.persistedReducer.favoriteProductListReducer.goods
    })
  });
  const dispatch = useDispatch();
  const removeList = (goodsItem : { id : number })=>{
    dispatch(removeGoods(goodsItem))
  }
  return (<>
  <div className="overflow-auto bg-blue-200 h-[10rem] w-full p-5 my-5">
    {goods && goods.map((x : { id : number, name : string }, idx : number) =>{
        return (
          <span className="w-[100%] m-1  p-0 text-sm border-[1px] border-black" key={idx} onClick={()=>{removeList(x)}}>
            {x.name}
          </span>
        )
      })}
  </div>
  </>);
}
 
export default SelectedArea;