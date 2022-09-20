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
    console.log('-start-');
    console.log(state);
    console.log('-end-');
    return ({
      goods : state.favoriteGoodsListReducer.goods
    })
  });

  console.log(goods);

  const dispatch = useDispatch();

  const addList = (goodsItem : { goodsId : number, goodsName : string }) => {
    dispatch(addGoods(goodsItem))
    console.log('굿즈 추가');
    
  }

  const removeList = (goodsItem : { goodsId : number })=>{
    dispatch(removeGoods(goodsItem))
    console.log('굿즈 삭제');
    
  }

  const { goodsList } = props;
  console.log(goodsList);

  return (
    <div className="grid h-[30vh] w-[100vw] grid-cols-2 overflow-scroll border">
      {goodsList.map((row, idx) => {
        return (
          <div key={idx} onClick={()=>{addList(row)}}>
            <GoodsCard img={'http://placekitten.com/175/175'} />
          </div>
        );
      })}
      {goods && goods.map((x : { goodsId : number, goodsName : string }, idx : number) =>{
        return (
          <div key={idx} onClick={()=>{removeList(x)}}>
            {x.goodsName}
          </div>
        )
      })}
    </div>
  );
};

export default GoodsScroll;
