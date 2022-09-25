import { FC } from 'react';
import type { Product }  from '../CategoryComponent'

const ProductPicker: FC<Product> = (props) => {
  const { productId, productName, productImg } = props;
  return (<span className="flex m-1 flex-col justify-center items-center p-0 bg-blue-300">
    {productName}
  </span>);
}
 
export default ProductPicker;