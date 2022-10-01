import { FC } from 'react';
import type { Product }  from '../CategoryComponent'

const ProductPicker: FC<Product> = (props) => {
  const { basicProductId, basicProductName, productImg } = props;
  return ((basicProductName.length <= 5) ?<span className="flex m-1 flex-col justify-center items-center p-0 bg-blue-300">
  {basicProductName}
</span> : <span className="text-xs flex m-1 flex-col justify-center items-center p-0 bg-blue-300">
    {basicProductName}
  </span>);
}
 
export default ProductPicker;