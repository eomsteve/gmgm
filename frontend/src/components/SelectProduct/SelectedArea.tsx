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
  const removeList = (goodsItem : { goodsId : number })=>{
    dispatch(removeGoods(goodsItem))
  }
  return (<>
  <div className="overflow-auto flex flex-wrap bg-blue-200 h-[10rem] w-full p-5 my-5">
    {goods && goods.map((x : { goodsId : number, goodsName : string }, idx : number) =>{
        return (
          <span className="m-1 bg-white p-1 text-xs border-[1px] border-black" key={idx} onClick={()=>{removeList(x)}}>
            {x.goodsName}
          </span>
        )
      })}
  </div>
  </>);
}
 
export default SelectedArea;