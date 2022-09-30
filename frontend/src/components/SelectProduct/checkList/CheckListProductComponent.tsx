import { useEffect, FC, CSSProperties, useState, useCallback } from 'react';
import SubText from '../UI/ProductPicker';
import type { RootState } from '@modules/store';
import { useSelector, useDispatch } from 'react-redux';
import SelectedArea from './SelectedArea';
import {
  addBasicProducts,
  removeBasicProducts,
} from '@modules/CheckListProductList';
import type {
  BasicProduct,
  CustomProduct,
} from '@modules/CheckListProductList';

interface ProductListsProps {
  productList: BasicProduct[];
}

const ProductLists: FC<ProductListsProps> = props => {
  const { productList } = props;
  const dispatch = useDispatch();
  console.log(productList);
  const addProduct = (product: BasicProduct) => {
    dispatch(addBasicProducts(product));
  };

  const removeProducts = (product: BasicProduct) => {
    dispatch(removeBasicProducts(product.basicProductId));
  };

  return (
    <>
      <div className="h-full flex flex-wrap justify-center content-start items-start flex-wrap overflow-auto scroll-auto mx-3 shadow-inner">
        {productList.map(product => {
          return (
            <div
              className="w-[150px] h-[100px] grid grid-cols-2 mx-1.5 p-3 rounded-lg shadow-lg"
              onClick={() => addProduct(product)}
              key={product.basicProductId}
            >
              <div className="flex content-center mt-3">
                <img
                  src={product.productImg}
                  alt=""
                  className="w-[70px] h-[70px] bg-white rounded-lg "
                />
                <div className="w-[80px] min-w-[80px] flex items-center justify-center p-1 text-sm">
                  {product.basicProductName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <SelectedArea /> */}
    </>
  );
};

export default ProductLists;
