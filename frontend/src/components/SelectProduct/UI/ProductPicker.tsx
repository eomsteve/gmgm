import { FC } from 'react';
import type { Product } from '../CategoryComponent';

const ProductPicker: FC<Product> = props => {
  const { basicProductId, basicProductName, productImg } = props;
  return basicProductName.length <= 5 ? (
    <span className="m-1 flex flex-col items-center justify-center rounded-full border border-gray-600 bg-white p-0">
      {basicProductName}
    </span>
  ) : (
    <span className="rounded-fullbg-[#b4d2e6] m-1 flex h-[26px] flex-col items-center justify-center rounded-full border border-gray-600 bg-white p-0 text-xs">
      {basicProductName}
    </span>
  );
};

export default ProductPicker;
