import { useEffect, FC, CSSProperties, useState, useCallback } from 'react';
import SubText from '../UI/ProductPicker';
import type { RootState } from '@modules/store';
import { useSelector, useDispatch } from 'react-redux';
import SelectedArea from './SelectedArea'
import { addBasicProducts, removeBasicProducts} from '@modules/CheckListProductList'
import type { BasicProduct, CustomProduct } from '@modules/CheckListProductList'

interface ProductListsProps {
  productList: BasicProduct[];
}



const ProductLists: FC<ProductListsProps> = props => {
  const { productList } = props;
  const dispatch = useDispatch();
  console.log(productList)
  const addProduct = (product : BasicProduct) => {
    dispatch(addBasicProducts(product));
  }

  const removeProducts = (product : BasicProduct) =>{
    dispatch(removeBasicProducts(product));
  }

  return (
    <>
      <div className="my-10 flex flex-wrap">
          {productList.map(product => {
            return (
              <div className="p-1 bg-blue-500 border-2 m-1"
                onClick={() => addProduct(product)}
                key={product.basicProductId}
              >
                <img src={product.productImg} alt="" />
                {product.basicProductName}
              </div>
            );
          })}
      </div>
      {/* <SelectedArea /> */}
    </>
  );
};

export default ProductLists;
