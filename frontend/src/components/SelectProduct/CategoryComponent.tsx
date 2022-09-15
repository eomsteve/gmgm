import { Component, FC, CSSProperties, useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Category from './UI/CategoryPicker';

import SubjectComponent from './SubjectComponent';

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
        { subject1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { subject2: [1, 2, 3, 4, 5, 6, 7, 8] },
        { subject3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { subject4: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { subject5: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
        { subject6: [1, 2, 3, 4, 5, 6, 7] },
        { subject7: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { subject8: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { subject9: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { subject10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { subject11: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { subject12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
      ],
    };
    console.log('data', TempData.Category);
    setData(TempData.Category);
  }, []);
  const [data, setData] = useState({});
  let [SubjectList, setSubjectList] = useState<string[]>([]);
  const testArray = [
    {
      name: 'subject1',
      subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    { name: 'subject2', subject: [1, 2, 3, 4, 5, 6, 7, 8] },
    { name: 'subject3', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: 'subject4', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { name: 'subject5', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { name: 'subject6', subject: [1, 2, 3, 4, 5, 6, 7] },
    { name: 'subject7', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    { name: 'subject8', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    { name: 'subject9', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    { name: 'subject10', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: 'subject11', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    { name: 'subject12', subject: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
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
    // onClick시 subjectlist값을 세팅하면 누를때마다 sublist가 바뀌고 재 랜덜링 될것,
    console.log(sub?.name);
    setSubjectList(sub.subject);
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
      <SubjectComponent subjectList={SubjectList}/>
    </div>
  );
};

export default CategorySlider;
