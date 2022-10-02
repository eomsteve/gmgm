import { FC, useState, useEffect } from 'react';
import FavoriteCard from './FavoriteCard';
import { getFavoriteSelect, getFavoritePageData } from '@apis/favoriteApi';
import GotoSelectionButton from './GotoSelection';
import { useNavigate } from 'react-router-dom';
import type { FavoritePageData, FavoriteItem } from '@apis/favoriteApi';
interface FavoriteSelectBoxProps {
  pageData: FavoriteItem[];
}

const businessData: { [key: string]: string } = {
  m: '대형마트',
  o: '온라인',
};

const FavoriteSelectBox: FC<FavoriteSelectBoxProps> = props => {
  const selectBoxPage = props.pageData;
  const optionList = ['m', 'o'];
  const [optionState, setOption] = useState<string>('m');
  const [pageData, setPageData] = useState<FavoriteItem[]>(selectBoxPage);
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(()=> e.target.value);
    
  };
  const navigate = useNavigate();
  return (
    <div className="mb-5">
      <span className="text-lg">
        즐겨찾기 목록
        <span className="ml-2 text-xs text-gray-500">
          즐겨 사는 상품 정보를 한 눈에 볼 수 있어요.
        </span>
      </span>
      <select
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
      </select>
      <div className="flex w-full flex-col items-center justify-center p-0">
        {pageData &&
          pageData.map((favoriteItem, index) => {
            
            return (
              <div key={favoriteItem.goodsId}>
                <FavoriteCard
                  img={favoriteItem.img}
                  goodsName={favoriteItem.goodsName}
                  priceGap={(optionState === 'm') ? favoriteItem.priceGapOff : favoriteItem.priceGapOn }
                  goodsPrice={(optionState === 'm') ? favoriteItem.recentPriceOff : favoriteItem.recentPriceOn}
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
    </div>
  );
};

export default FavoriteSelectBox;
