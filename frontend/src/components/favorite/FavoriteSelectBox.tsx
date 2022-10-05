import { FC, useState, useEffect } from 'react';
import FavoriteCard from './FavoriteCard';
import { getFavoriteSelect, getFavoritePageData } from '@apis/favoriteApi';
import GotoSelectionButton from './GotoSelection';
import Recommendation from './RecommendComponent';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '@modules/store';
import { useSelector, useDispatch } from 'react-redux';

import type { FavoritePageData, FavoriteItem } from '@apis/favoriteApi';


import './toggle_favorite.css';


interface FavoriteSelectBoxProps {
  pageData: FavoritePageData;
}

const businessData: { [key: string]: string } = {
  m: '대형마트',
  o: '온라인',
};

interface Recommend {
  goodsId: number;
  goodsName: string;
  img: string;
}

const FavoriteSelectBox: FC<FavoriteSelectBoxProps> = props => {
  const { pageData } = props;
  console.log("selectPage :" ,pageData);

  const optionList = ['m', 'o'];
  const data = useSelector((state: RootState) => {
    const goodsItemList =
      state.persistedReducer.favoriteProductListReducer.goods;
    console.log(
      'favorite product :',
      state.persistedReducer.favoriteProductListReducer.goods,
    );
    return goodsItemList;
  });
  const [optionState, setOption] = useState<string>('m');
  // const [favoritePageData, setPageData] = useState<FavoriteItem[]>(selectBoxPage.favoriteItems);
  // const [recommendData, setRecommendData] = useState<Recommend[]>(
  //   selectBoxPage.favoriteRecommends,
  // );
  // const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setOption(() => e.target.value);
  // };

  const [checkedOffline, setCheckedOffline] = useState<boolean>(true);
  const [checkedOnline, setCheckedOnline] = useState<boolean>(false);
  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('클릭 전 optionState 는',optionState)
    setCheckedOffline( checkedOffline===true ? false : true)
    setCheckedOnline( checkedOnline===true ? false : true)
    setOption(()=>e.target.value);
    // setTimeout(()=>{console.log('클릭 후 optionState 는',optionState)}, 3000)
    console.log('클릭 후 optionState 는',optionState)
    
  };




  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log('hello');
  //   setPageData(data);
  //   // setRecommendData(()=>data.favoriteRecommends)
  // }, [data]);

  return (
    <div className="mb-5">
      <span className="text-lg">
        즐겨찾기 목록
        <span className="ml-2 text-xs text-gray-500">
          즐겨 사는 상품 정보를 한 눈에 볼 수 있어요.
        </span>
      </span>
      {/* <select
        onChange={handleSelection}
        // 여기 props 로 받아와야함.
        // defaultValue="m"
        name="selectBox"
        className="form-select form-select-sm
    m-3
    block
    min-w-[25%]
    max-w-[95%]
    rounded
    border
    border-gray-300
    bg-white bg-clip-padding bg-no-repeat
    px-2 py-1 text-xs
    font-normal
    text-gray-700
    transition
    ease-in-out
    focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
        aria-label=".form-select-sm example"
      >
        {optionList.map((option, index) => (
          <option value={option} key={index}>
            {businessData[option]}
          </option>
        ))}
      </select> */}

        <div className="favorite-toggle" >
          <input type="radio" id="favorite-toggle-offline" onChange={handleSelection}   name="toggle" value="m" checked={checkedOffline}/>
          <label className="radio-button" id="pricing-toggle-offline-radio" htmlFor="favorite-toggle-offline"> 오프라인</label>
        
          <input type="radio"  id="favorite-toggle-online"  onChange={handleSelection}   name="toggle" value="o" checked={checkedOnline} />
          <label className="radio-button" id="pricing-toggle-online-radio" htmlFor="favorite-toggle-online"> 온라인</label>
        </div>

      <div className="flex w-full flex-col items-center justify-center bg-gradient-to-t from-blur p-1">
        {pageData &&
          pageData.favoriteItems.map((favoriteItem, index) => {
            return (
              <div key={favoriteItem.goodsId}>
                <FavoriteCard
                  img={favoriteItem.img}
                  goodsName={favoriteItem.goodsName}
                  priceGap={
                    optionState === 'm'
                      ? favoriteItem.priceGapOff
                      : favoriteItem.priceGapOn
                  }
                  goodsPrice={
                    optionState === 'm'
                      ? favoriteItem.recentPriceOff
                      : favoriteItem.recentPriceOn
                  }
                  productId={favoriteItem.basicProductId}
                  goodsId={favoriteItem.goodsId}
                  businessType={optionState}
                />
              </div>
            );
          })}
        <div
          onClick={() => {
            navigate('/favorite/selection');
          }}
        >
          <GotoSelectionButton />
        </div>
      </div>
      {<Recommendation favoriteRecommends={pageData.favoriteRecommends} />}
    </div>
  );
};

export default FavoriteSelectBox;
