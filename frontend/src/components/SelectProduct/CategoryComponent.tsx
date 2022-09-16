import { Component, FC, CSSProperties, useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Category from './UI/CategoryPicker';

import ProductComponent from './ProductComponent';

interface CategorySliderProps {}

interface NextArrowProps {
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// interface AxiosData {
//   tempData : {
//     string : object[
//       string : ``
//     ];
//   }
// }

const CategorySlider: FC<CategorySliderProps> = () => {
  //after axios, useEffect
  useEffect(() => {
    console.log('axios here to get Category List and SubJectData');
    const TempData = {
      Category: [
        { product1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { product2: [1, 2, 3, 4, 5, 6, 7, 8] },
        { product3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { product4: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { product5: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
        { product6: [1, 2, 3, 4, 5, 6, 7] },
        { product7: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { product8: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { product9: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { product10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { product11: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { product12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
      ],
    };
    console.log('data', TempData.Category);
    setData(TempData.Category);
  }, []);
  const [data, setData] = useState({});
  let [ProductList, setProductList] = useState<string[]>([]);
  const testArray = [
    {
      name: 'product1',
      product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    { name: 'product2', product: [1, 2, 3, 4, 5, 6, 7, 8] },
    { name: 'product3', product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: 'product4', product: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { name: 'product5', product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { name: 'product6', product: [1, 2, 3, 4, 5, 6, 7] },
    { name: 'product7', product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    { name: 'product8', product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    { name: 'product9', product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    { name: 'product10', product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: 'product11', product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    { name: 'product12', product: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
  ];
  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    dots: true,
    slidesPerRow: 3,
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
  function PrevArrow({ onClick }: PrevArrowProps) {
    return (
      <div className="prev-arrow" onClick={onClick}>
        난 어디에 있는가?
      </div>
    );
  }

  async function handle(sub: any) {
    // onClick시 productlist값을 세팅하면 누를때마다 sublist가 바뀌고 재 랜덜링 될것,
    console.log(sub?.name);
    setProductList(sub.product);
  }

  return (
    <div>
      <h2>즐겨찾기 리스트 추가하기</h2>
      <Slider {...settings}>
        {data &&
          testArray.map((row, idx) => {
            // console.log(idx, row);
            return (
              <div onClick={() => handle(row)} key={0}>
                <Category img="http://placekitten.com/75/75" />
              </div>
            );
          })}
      </Slider>
      <ProductComponent productList={ProductList}/>
    </div>
  );
};

export default CategorySlider;
