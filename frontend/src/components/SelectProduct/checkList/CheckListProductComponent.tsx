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
      <div className="my-10 mx-3 flex flex-wrap shadow-inner scroll-auto h-96 overflow-auto">
        {productList.map(product => {
          return (
            <div
              className="mx-1.5 p-3 h-20 grid grid-cols-2 content-center rounded-lg shadow-lg"
              onClick={() => addProduct(product)}
              key={product.basicProductId}
            >
              <div
                className="w-[100px] flex justify-center content-center">
                <img
                  src={product.productImg}
                  alt=""
                  className="w-20 bg-white rounded-lg"
                />
                  <div className="w-20 text-center">
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
