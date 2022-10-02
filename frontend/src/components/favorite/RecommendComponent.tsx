import { FC } from 'react';
import type { GoodsItem } from '@components/SelectProduct/ProductComponent';

interface RecommendProps {
  // goodsList: GoodsItem[];
}

const Recommend: FC<RecommendProps> = props => {
  // const { goodsList } = props;
  return (
    <>
      <div className="my-2 mt-[1vh] text-lg">
          이런 상품은 어때요?
          <span className="ml-2 text-xs text-gray-500">
            다음 상품들도 좋아하실 것 같아요.
          </span>
        </div>
      <div className="border m-3 w-[85vw] h-[66px] text-center text-align-center">
        <p>안녕 난 Recommend Component</p>
        <p>item은 GoodsCard 재활용하면 되지롱</p>
      </div>
    </>
  );
};

export default Recommend;
