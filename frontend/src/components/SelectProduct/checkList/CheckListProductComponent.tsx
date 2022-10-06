import { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  addBasicProducts,
  removeBasicProducts,
} from '@modules/CheckListProductList';
import type {
  BasicProduct,
} from '@modules/CheckListProductList';

interface ProductListsProps {
  productList: BasicProduct[];
}

const ProductLists: FC<ProductListsProps> = props => {
  const { productList } = props;
  const dispatch = useDispatch();
  const addProduct = (product: BasicProduct) => {
    dispatch(addBasicProducts(product));
  };

  const removeProducts = (product: BasicProduct) => {
    dispatch(removeBasicProducts(product.basicProductId));
  };

  return (
    <>
      <div className="mx-5 h-full">
        <div className="my-2 mt-[1vh] text-lg">
          품목
          <span className="ml-2 text-xs text-gray-500">
            품목을 선택해서 목록에 추가하세요.
          </span>
        </div>
        <div className="grid h-5/6 grid-cols-2 flex-wrap content-start overflow-auto scroll-auto">
          {productList.map(product => {
            return (
              <div
                className="m-2 grid grid-cols-3 items-center gap-2 rounded-lg border border-gray-300 p-3"
                onClick={() => addProduct(product)}
                key={product.basicProductId}
              >
                <div className="flex h-12 w-12 justify-center">
                  <img
                    src={product.productImg}
                    alt=""
                    className="rounded-lg bg-white"
                  />
                </div>
                <div className="ps-2 col-span-2 col-start-2 pl-2">
                  {product.basicProductName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductLists;
