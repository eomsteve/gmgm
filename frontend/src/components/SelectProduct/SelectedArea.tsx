import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeGoods, updateFavoriteItems } from '@modules/FavoriteProductList';
import type { RootState, AppDispatch } from '@modules/store';
import { ReactComponent as Delete } from '@src/assets/icons/itemDelete.svg';
interface SelectedAreaProps {}

const SelectedArea: FC<SelectedAreaProps> = () => {
  const navigate = useNavigate();
  const { goods } = useSelector((state: RootState) => {
    console.log(state);
    return {
      goods: state.persistedReducer.favoriteProductListReducer.goods,
    };
  });
  const dispatch = useDispatch<AppDispatch>();
  const removeList = (goodsItem: { goodsId: number }) => {
    dispatch(removeGoods(goodsItem));
  };

  const updateItem = async () => {
    const goodsList = goods.map((item: { goodsId: number }) => {
      return item.goodsId;
    });
    console.log(goodsList);
    const data = await dispatch(updateFavoriteItems(goodsList)).unwrap();
    console.log(data);
    if (data) {
      navigate('/favorite');
    }
  };
  console.log(goods);
  

  return (
    <>
      <div className="flex h-full w-full flex-col bg-[#b3d1e6]">
        <div className="my-3 mx-5 text-lg">
          즐겨찾기 목록
          <span
            onClick={() => {
              updateItem();
            }}
            className="absolute right-5 rounded-full border border-gray-600 bg-white px-3 py-0.5"
          >
            다음 &gt;
          </span>
        </div>
        <div className="flex h-full flex-wrap content-start items-start overflow-auto scroll-auto p-3">
          {goods &&
            goods.map(
              (x: { goodsId: number; goodsName: string }, idx: number) => {
                return (
                  <span
                    className="m-1 flex items-center rounded-full bg-white px-2 py-1 text-sm"
                    key={idx}
                    onClick={() => {
                      removeList(x);
                    }}
                  >
                    <span>{x.goodsName}</span>
                    <span className="pl-1.5">
                      <Delete width="0.5rem" height="0.5rem" />
                    </span>
                  </span>
                );
              },
            )}
        </div>
      </div>
    </>
  );
};

export default SelectedArea;
