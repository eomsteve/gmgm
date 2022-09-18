import { Component, FC, CSSProperties, useState } from 'react';
import GoodsCard from './UI/GoodsCard';

import type { RootState } from '../../modules/store'
import { useSelector, useDispatch } from 'react-redux'

interface GoodsScrollProps {
  goodsList: number[];
}

const GoodsScroll: FC<GoodsScrollProps> = props => {
  
  // const count = useSelector((state: RootState) => state.counter.value)
  // const dispatch = useDispatch()

  const { goodsList } = props;
  console.log(goodsList);

  return (
    <div className="w-[100vw] h-[30vh] grid grid-cols-2 border overflow-scroll">
      {goodsList.map((row, idx) => {
        console.log(row);
        return (
          <div  key={idx}>
          <GoodsCard img={"http://placekitten.com/175/175"}/>
        </div>
        )
      })}
    </div>
  );
};

export default GoodsScroll;
