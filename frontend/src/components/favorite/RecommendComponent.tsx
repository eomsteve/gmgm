import { FC } from 'react';
import type { GoodsItem } from '@components/SelectProduct/ProductComponent';
import GoodsCard from '@components/SelectProduct/UI/GoodsCard'
import type { AppDispatch} from '@modules/store'
import { useDispatch } from 'react-redux';
import { updateRecommendItem } from '@modules/FavoriteProductList'
interface RecommendProps {
  favoriteRecommends: { goodsId: number; goodsName: string; img: string }[];
}

const Recommend: FC<RecommendProps> = props => {
  const { favoriteRecommends } = props;
  const dispatch = useDispatch<AppDispatch>();
  const updateItems = async (goodsId : number) => {
    const data = await dispatch(updateRecommendItem(goodsId));
    console.log(data);
    
  }
  return (
    <>
      <div className="my-2 mt-[1vh] text-lg">
        이런 상품은 어때요?
        <span className="ml-2 text-xs text-gray-500">
          다음 상품들도 좋아하실 것 같아요.
        </span>
      </div>
      {(favoriteRecommends.length)
      ?
      <div className="grid grid-cols-2 text-center text-align-center">
        {favoriteRecommends.map((goods) => {
          return  <div
          key={goods.goodsId}
          onClick={() => updateItems(goods.goodsId)}
          ><GoodsCard goodsId={goods.goodsId} goodsName={goods.goodsName} goodsImg={goods.img} /></div>
        })}
      </div>
      : <div className="flex w-full flex-col items-center justify-center bg-gradient-to-t from-blur p-1">
        <div
          className="my-3 mx-5 flex text-gray-500
          w-[86vw] flex-col items-center justify-center 
          rounded border border-gray-300 py-5 px-2 lg:py-0">
          <h3>추천 상품은 매일 오전 9시에 업데이트 됩니다</h3>
        </div>
      </div>
      }
    </>
  );
};

export default Recommend;
