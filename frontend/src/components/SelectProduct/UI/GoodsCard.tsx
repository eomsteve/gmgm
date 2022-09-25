import { FC } from 'react';
import type { GoodsItem } from '../ProductComponent'


const GoodsCard: FC<GoodsItem> = props => {
  const { id,name,img  } = props;
  
  return (
    <div className="m-4 flex flex-col items-center justify-center p-0">
      <img className="border p-0" src="http://placekitten.com/75/75" />
      <p> {name} </p>
    </div>
  );
};

export default GoodsCard;
