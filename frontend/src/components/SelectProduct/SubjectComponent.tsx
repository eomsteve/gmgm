import { Component, FC, CSSProperties } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import SubText from './UI/SubjectPicker';

interface CategorySliderProps {
  subjectList : string[]
}

interface NextArrowProps {
  style? : CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CategorySlider: FC<CategorySliderProps> = (props) => {
  const { subjectList } = props;
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    dots: true,
    slidesPerRow: 4,
    arrows: false
    // PrevArrow : <PrevArrow />,
    // nextArrow: <NextArrow />,
  };

  function NextArrow({ style,onClick }: NextArrowProps) {
    return (
      <span className="flex next-arrow bg-red-200" onClick={onClick}>
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
    // onClick시 subjectlist값을 세팅하면 누를때마다 sublist가 바뀌고 재 랜덜링 될것,
    console.log(sub);
  }

  return (
    <div className="mt-10">
      <Slider {...settings}>
        {subjectList.map(row => {
          return (
            <div onClick={() => handle(row)} key={0}>
              <SubText />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CategorySlider;
