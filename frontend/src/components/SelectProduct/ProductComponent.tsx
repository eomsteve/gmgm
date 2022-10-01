import { useEffect, FC, CSSProperties, useState, useCallback } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import SubText from './UI/ProductPicker';
import Goods from './GoodsComponent';
import './UI/product-slick.css'
import type { Product } from './CategoryComponent'
import { getGoodsDataByProductId } from '@routers/APIs/favoriteApi'


interface ProductListsProps {
  productList: Product[];
}
type GoodsPrice = {
  price : number;
  researchDate : string;
}
export type GoodsItem = {
  goodsId : number;
  goodsName : string;
  img? : string;
  capacity? : string;
  measure? : string;
  ea? : string;
  goodsPrice? : GoodsPrice[];
}

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
  useEffect(()=>{
    setGoodsList([])
  },[productList])


  const handle= useCallback((productId: number) => {
    const loadGoodsData = async(productId : number) => {
      const goodsData  = await getGoodsDataByProductId(productId);
      console.log(goodsData);
      
      setGoodsList(goodsData);
    }
    
    loadGoodsData(productId)
    // axios 통신을 누를때마다 합니다? 그래서 useState에 값을 저장하고 반영해서 반복문 돌림
  },[]);

  return (
    <>
      <div className="my-10">
        <Slider {...settings}>
          {productList.map(product => {
            return (
              <div onClick={() => handle(product.basicProductId)} key={product.basicProductId}>
                <SubText basicProductId={product.basicProductId} basicProductName={product.basicProductName} />
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
