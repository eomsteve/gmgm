import { FC } from 'react';
import GoodsCard from './UI/GoodsCard';

import type { GoodsItem } from './ProductComponent';
import type { RootState } from '../../modules/store';
import { useSelector, useDispatch } from 'react-redux';
import { addGoods, removeGoods } from '../../modules/FavoriteProductList';
interface GoodsScrollProps {
  goodsList: GoodsItem[];
}

const GoodsScroll: FC<GoodsScrollProps> = props => {
  const { goods } = useSelector((state: RootState) => {
    return {
      goods: state.persistedReducer.favoriteProductListReducer.goods,
    };
  });

  const dispatch = useDispatch();

  const addList = (goodsItem: { goodsId: number; goodsName: string }) => {
    dispatch(addGoods(goodsItem));
  };

  const removeList = (goodsItem: { goodsId: number }) => {
    dispatch(removeGoods(goodsItem));
  };

  const { goodsList } = props;

  return (
    <div className="mx-5 h-full">
      <div className="my-2 mt-[1vh] text-lg">
        상품
        <span className="ml-2 text-xs text-gray-500">
          품목을 선택해서 목록에 추가하세요
        </span>
      </div>
      <div className="grid h-1/2 grid-cols-2 flex-wrap content-start overflow-auto scroll-auto">
        {goodsList.map((goods, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                addList(goods);
              }}
            >
              <GoodsCard
                goodsId={goods.goodsId}
                goodsName={goods.goodsName}
                goodsImg={goods.goodsImg}
              />
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default GoodsScroll;
