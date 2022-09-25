import { Component, FC, CSSProperties, useState, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import GoodsCard from './UI/GoodsCard';

import type { RootState } from '../../modules/store';
import type { GoodsItem } from './ProductComponent';
import { useSelector, useDispatch } from 'react-redux';
import { addGoods, removeGoods } from '../../modules/FavoriteProductList';
interface GoodsScrollProps {
  goodsList: GoodsItem[];
}

const GoodsScroll: FC<GoodsScrollProps> = props => {
  const {goods} = useSelector((state : RootState) => {
    
    console.log(state);
    return ({
      goods : state.persistedReducer.favoriteProductListReducer.goods
    })
  });


  const dispatch = useDispatch();

  const addList = (goodsItem : { id : number, name : string }) => {
    dispatch(addGoods(goodsItem))
    console.log('굿즈 추가');
    
  }

  const removeList = (goodsItem : { id : number })=>{
    dispatch(removeGoods(goodsItem))
    console.log('굿즈 삭제');
  }

  const { goodsList } = props;
  // console.log(goodsList);

  return (
    <div className="grid h-[30vh] w-[100vw] grid-cols-2 overflow-scroll border">
      {goodsList.map((goods, idx) => {
        return (
          <div key={idx} onClick={()=>{addList(goods)}}>
            <GoodsCard id={goods.id} name={goods.name} img={'http://placekitten.com/175/175'} />
          </div>
        );
      })}

      {/* {goods && goods.map((x : { id : number, name : string }, idx : number) =>{
        return (
          <div key={idx} onClick={()=>{removeList(x)}}>
            {x.name}
          </div>
        )
      })} */}
    </div>
  );
};

export default GoodsScroll;
