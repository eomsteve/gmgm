import { Component, FC, CSSProperties, useState, useCallback } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import SubText from './UI/ProductPicker';
import Goods from './GoodsComponent';



interface ProductListsProps {
  productList: string[];
}
type GoodsPrice = {
  price : number;
  researchDate : string;
}
export type GoodsItem = {
  goodsId : number;
  goodsName : string;
  goodsImg? : string;
  cheapPrice? : string;
  cheapUrl? : string;
  capacity? : string;
  measure? : string;
  ea? : string;
  goodsPrice? : GoodsPrice[];
}

interface NextArrowProps {
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ProductLists: FC<ProductListsProps> = props => {
  const { productList } = props;
  let [goodsList, setGoodsList] = useState<GoodsItem[]>([]);
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    dots: true,
    slidesPerRow: 4,
    arrows: false,
    // PrevArrow : <PrevArrow />,
    // nextArrow: <NextArrow />,
  };

  function NextArrow({ style, onClick }: NextArrowProps) {
    return (
      <span className="next-arrow flex bg-red-200" onClick={onClick}>
        누르면 넘어감
      </span>
    );
  }

  const handle= useCallback((sub: any) => {
    // onClick시 goods 가져오기 ??? 이게 맞아??
    console.log(sub);
    // axios 통신을 누를때마다 합니다? 그래서 useState에 값을 저장하고 반영해서 반복문 돌림
    setGoodsList([{ goodsId: 1, goodsName: 'apple' }]);
  },[]);

  return (
    <>
      <div className="my-10">
        <Slider {...settings}>
          {productList.map(row => {
            // console.log(row);

            return (
              <div onClick={() => handle(row)} key={0}>
                <SubText />
              </div>
            );
          })}
        </Slider>
      </div>
      <Goods goodsList={goodsList} />
    </>
  );
};

export default ProductLists;
