import { FC } from 'react';
import type { GoodsItem } from '../ProductComponent'


const GoodsCard: FC<GoodsItem> = props => {
  const { goodsId,goodsName,img  } = props;
  
  return (
    <div className="m-4 flex flex-col items-center justify-center p-0">
      <img className="border p-0 text-sm" src="http://placekitten.com/75/75" />
      <p className="text-xs break-words "> {goodsName} </p>
    </div>
  );
};

export default GoodsCard;
