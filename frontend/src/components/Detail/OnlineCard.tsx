import { FC, useState } from 'react';
import type { GoodsInfo } from './DetailSelect'
interface OnlineCardProps {
  goodsProps : GoodsInfo
}
const OnlineCard: FC<OnlineCardProps> = (props) => {
  const {goodsProps} = props;
  return (
    <>
      <div onClick={() => goodsProps.cheapUrl ? window.open(`${goodsProps.cheapUrl}` , '_blank') : ''} className="my-4 w-full">
        <span className="text-lg">
          온라인 최저가
          {goodsProps.cheapUrl ? <span className="ml-2 text-xs text-gray-500">
            선택한 상품의 온라인 최저가 구매 링크로 이동합니다.
          </span> : <span className="ml-2 text-xs text-gray-500">
            선택한 상품의 온라인 최저가 구매 가격 정보 입니다.
          </span>}
        </span>
        <div className="m-2 grid grid-cols-4 rounded border border-gray-300 p-3">
          <img src={goodsProps.goodsImg} alt="" />
          <div className="col-span-3 flex flex-col px-3 text-[0.9rem]">
            <p>
              <span className="text-[1rem]">{goodsProps.goodsName}</span>의
            </p>
            <p>온라인 최저가는</p>
            <p>
              <span className="text-[1.2rem]">{goodsProps.cheapPrice}</span> 원 입니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineCard;
