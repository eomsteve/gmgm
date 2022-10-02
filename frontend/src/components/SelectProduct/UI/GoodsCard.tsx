import { FC } from 'react';
import type { GoodsItem } from '../ProductComponent'


const GoodsCard: FC<GoodsItem> = props => {
  const { goodsId,goodsName,goodsImg  } = props;
  
  return (
    (goodsName.length <= 8) ? <div className="m-2 grid h-5/6 grid-cols-3 items-center rounded-lg border border-gray-300 p-4 text-[16px]">
    <div className="flex h-12 w-12 justify-center">
      <img className="p-0 rounded-lg" src={goodsImg} />
    </div>
    <div className="col-span-2 p-1 ps-2"> {goodsName} </div>
  </div> :  <div className="m-2 grid h-5/6 grid-cols-3 items-center rounded-lg border border-gray-300 p-3 text-[15px]">
      <div className="flex h-12 w-12 justify-center">
        <img className="rounded-lg" src={goodsImg} />
      </div>
      <div className="col-span-2 p-2"> {goodsName} </div>
    </div>
    );
};

export default GoodsCard;
