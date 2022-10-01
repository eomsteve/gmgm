import { FC } from 'react';
import type { Product }  from '../CategoryComponent'

const ProductPicker: FC<Product> = (props) => {
  const { basicProductId, basicProductName, productImg } = props;
  return ((basicProductName.length <= 5) ?<span className="flex m-1 flex-col justify-center items-center p-0 border border-gray-600 bg-white rounded-full">
  {basicProductName}
</span> : <span className="text-xs flex m-1 flex-col justify-center items-center h-[26px] p-0 border border-gray-600 bg-white rounded-fullbg-[#b4d2e6] rounded-full">
    {basicProductName}
  </span>);
}
 
export default ProductPicker;