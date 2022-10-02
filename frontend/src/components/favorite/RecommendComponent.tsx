import { FC } from 'react';
import type { GoodsItem } from '@components/SelectProduct/ProductComponent';

interface RecommendProps {
  // goodsList: GoodsItem[];
}

const Recommend: FC<RecommendProps> = props => {
  // const { goodsList } = props;
  return (
    <>
      <div className="border m-3 w-[85vw] h-[66px] text-center text-align-center">
        <p>안녕 난 Recommend Component</p>
        <p>item은 GoodsCard 재활용하면되지롱</p>
      </div>
    </>
  );
};

export default Recommend;
