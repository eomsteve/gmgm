import { FC } from 'react';
import type { GoodsItem } from '@components/SelectProduct/ProductComponent';
import GoodsCard from '@components/SelectProduct/UI/GoodsCard'
interface RecommendProps {
  favoriteRecommends: {goodsId : number, goodsName : string, img:string}[]
}

const Recommend: FC<RecommendProps> = props => {
  const { favoriteRecommends } = props;
  return (
    <>
      <div className="my-2 mt-[1vh] text-lg">
          이런 상품은 어때요?
          <span className="ml-2 text-xs text-gray-500">
            다음 상품들도 좋아하실 것 같아요.
          </span>
        </div>
      <div className="grid grid-cols-2 border m-3 w-[85vw]  text-center text-align-center">
        {favoriteRecommends.map((goods) => {
          return <GoodsCard goodsId={goods.goodsId} goodsName={goods.goodsName} goodsImg={goods.img} />
        })}
      </div>
    </>
  );
};

export default Recommend;
