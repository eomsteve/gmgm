import { Component, FC, CSSProperties, useState } from 'react';
import ProductCard from './UI/ProductCard';

interface ProductScrollProps {
  productList: number[];
}

const ProductScroll: FC<ProductScrollProps> = props => {
  const { productList } = props;
  console.log(productList);

  return (
    <div className="w-[100vw] h-[30vh] grid grid-cols-2 border overflow-scroll">
      {productList.map((row, idx) => {
        console.log(row);
        return (
          <div  key={idx}>
          <ProductCard img={"http://placekitten.com/175/175"}/>
        </div>
        )
      })}
    </div>
  );
};

export default ProductScroll;
