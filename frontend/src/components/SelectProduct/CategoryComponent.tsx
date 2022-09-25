import { Component, FC, CSSProperties, useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Category from './UI/CategoryPicker';

import ProductComponent from './ProductComponent';

import { getFavoriteSelect } from '../../routers/APIs/favoriteApi';

interface CategorySliderProps {}

interface NextArrowProps {
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export type Product = {
  productId : number,
  productName : string,
  productImg?: string;
}
interface CateGoryLoad {
  categoryId : number;
  categoryName : string;
  categoryImg : string;
  products : Product[];
}

const CategorySlider: FC<CategorySliderProps> = () => {
  //after axios, useEffect
  const [data, setData] = useState<CateGoryLoad[]>([]);
  useEffect(() => {
    const categoryLoad = async () => {
      const fetchData = await getFavoriteSelect();
      setData(fetchData);
    };
    categoryLoad();
  }, []);

  console.log(data);
  let [ProductList, setProductList] = useState<Product[]>([]);
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

  async function handle(product: Product[]) {
    // onClick시 productlist값을 세팅하면 누를때마다 sublist가 바뀌고 재 랜덜링 될것,
    console.log(product);
    setProductList(product);
  }

  return (
    <div>
      <h2>즐겨찾기 리스트 추가하기</h2>
      <Slider {...settings}>
        {data &&
          data.map(category => {
            const categoryItem = category;
            // console.log(categoryItem.categoryId);

            return (
              <div
                onClick={() => handle(categoryItem.products)}
                key={categoryItem.categoryId}
              >
                <Category
                  categoryImg={categoryItem.categoryImg}
                  categoryName={categoryItem.categoryName}
                />
              </div>
            );
          })}
      </Slider>
      <ProductComponent productList={ProductList} />
    </div>
  );
};

export default CategorySlider;
