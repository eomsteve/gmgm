import { FC, CSSProperties, useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Category from '../UI/CategoryPicker';
import {useLocation} from 'react-router-dom'
import ProductComponent from './CheckListProductComponent';

import { getFavoriteSelect } from '@apis/favoriteApi';
import type {BasicProduct} from '@modules/CheckListProductList'
import SelectedArea from './SelectedArea'
interface CategorySliderProps {}

interface NextArrowProps {
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}


interface CategoryLoad {
  categoryId : number;
  categoryName : string;
  categoryImg : string;
  products : BasicProduct[];
}

const CategorySlider: FC<CategorySliderProps> = () => {

  //after axios, useEffect
  const [data, setData] = useState<CategoryLoad[]>([]);
  const location = useLocation();
  const params = location.state as { isEdit : boolean, checklistId : string };
  console.log(params.isEdit);
  
  useEffect(() => {
    const categoryLoad = async () => {
      const fetchData = await getFavoriteSelect();
      setData(fetchData);
    };
    categoryLoad();

  }, []);

  console.log(data);
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
    console.log(product);
    setProductList(product);
  }

  return (
    <div>
      <h2>체크리스트 추가하기</h2>
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
      <div className="mt-[25px]">
        품목 선택하기
      </div>
      <div className='h-[30vh] mb-10'>
        <ProductComponent productList={ProductList} />
      </div>
      <div className='h-[25vh]'>
        <SelectedArea isEdit={params.isEdit} checklistId={params.checklistId}/>
      </div>
    </div>
  );
};

export default CategorySlider;
