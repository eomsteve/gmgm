import { FC, CSSProperties, useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Category from '../UI/CategoryPicker';
import { useLocation } from 'react-router-dom';
import ProductComponent from './CheckListProductComponent';

import { getFavoriteSelect } from '@apis/favoriteApi';
import type { BasicProduct } from '@modules/CheckListProductList';
import SelectedArea from './SelectedArea';
interface CategorySliderProps {}

interface NextArrowProps {
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface CategoryLoad {
  categoryId: number;
  categoryName: string;
  categoryImg: string;
  products: BasicProduct[];
}

const CategorySlider: FC<CategorySliderProps> = () => {
  //after axios, useEffect
  const [data, setData] = useState<CategoryLoad[]>([]);
  const location = useLocation();
  const params = location.state as { isEdit: boolean; checklistId: string };

  useEffect(() => {
    const categoryLoad = async () => {
      const fetchData = await getFavoriteSelect();
      setData(fetchData);
    };
    categoryLoad();
  }, []);

  let [ProductList, setProductList] = useState<BasicProduct[]>([]);
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

  async function handle(product: BasicProduct[]) {
    // onClick시 productlist값을 세팅하면 누를때마다 sublist가 바뀌고 재 랜덜링 될것,
    setProductList(product);
  }

  return (
    <div className="">
      <div className="mx-5 h-[28vh]">
        <div className="mt-5 mb-0 text-lg">
          카테고리
          <span className="ml-2 text-xs text-gray-500">
            카테고리를 선택해서 품목을 확인하세요.
          </span>
        </div>
        <div className=" h-[28vh]">
          <Slider {...settings}>
            {data &&
              data.map(category => {
                const categoryItem = category;
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
        </div>
      </div>
      <div className="mb-2 h-[33vh]">
        <ProductComponent productList={ProductList} />
      </div>
      <div className="h-[28vh]">
        <SelectedArea isEdit={params.isEdit} checklistId={params.checklistId} />
      </div>
    </div>
  );
};

export default CategorySlider;
