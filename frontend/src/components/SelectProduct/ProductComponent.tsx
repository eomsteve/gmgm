import { useEffect, FC, CSSProperties, useState, useCallback } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import SubText from './UI/ProductPicker';
import Goods from './GoodsComponent';
import './UI/product-slick.css';
import type { Product } from './CategoryComponent';
import { getGoodsDataByProductId } from '@routers/APIs/favoriteApi';

interface ProductListsProps {
  productList: Product[];
}
type GoodsPrice = {
  price: number;
  researchDate: string;
};
export type GoodsItem = {
  goodsId: number;
  goodsName: string;
  goodsImg?: string;
  capacity?: string;
  measure?: string;
  ea?: string;
  goodsPrice?: GoodsPrice[];
};

interface NextArrowProps {
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ProductLists: FC<ProductListsProps> = props => {
  const { productList } = props;
  let [goodsList, setGoodsList] = useState<GoodsItem[]>([]);
  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    dots: true,
    slidesPerRow: 4,
    arrows: false,
  };
  useEffect(() => {
    setGoodsList([]);
  }, [productList]);

  const handle = useCallback((productId: number) => {
    const loadGoodsData = async (productId: number) => {
      const goodsData = await getGoodsDataByProductId(productId);

      setGoodsList(goodsData);
    };

    loadGoodsData(productId);
  }, []);

  return (
    <>
      <div className="my-9 mx-5">
        <div className="my-2 mt-[1vh] text-lg">
          품목
          <span className="ml-2 text-xs text-gray-500">
            품목을 선택해서 상품을 확인하세요.
          </span>
        </div>
        <Slider {...settings}>
          {productList.map(product => {
            return (
              <div
                onClick={() => handle(product.basicProductId)}
                key={product.basicProductId}
              >
                <SubText
                  basicProductId={product.basicProductId}
                  basicProductName={product.basicProductName}
                />
              </div>
            );
          })}
        </Slider>
      </div>
      {goodsList && <Goods goodsList={goodsList} />}
    </>
  );
};

export default ProductLists;
