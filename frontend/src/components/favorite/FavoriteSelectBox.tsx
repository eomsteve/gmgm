import { FC, useState } from 'react';
import FavoriteCard from './FavoriteCard';
import GotoSelectionButton from './GotoSelection';
import Recommendation from './RecommendComponent';
import { useNavigate } from 'react-router-dom';
import type { FavoritePageData } from '@apis/favoriteApi';
import Tooltip from '@components/tooltiptest';
import './toggle_favorite.css';

interface FavoriteSelectBoxProps {
  pageData: FavoritePageData;
}

const FavoriteSelectBox: FC<FavoriteSelectBoxProps> = props => {
  const { pageData } = props;

  const [optionState, setOption] = useState<string>('m');

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(() => (optionState == 'm' ? 'o' : 'm'));
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
      <div className="flex items-center">
        <div className="switch-button m-3 ml-[3vw] ">
          <input
            onChange={handleSelection}
            className="switch-button-checkbox "
            type="checkbox"
          ></input>
          <label className="switch-button-label" htmlFor="">
            <span className="switch-button-label-span">오프라인</span>
          </label>
        </div>
        <span className="z-5">
          <Tooltip />
        </span>
      </div>

      <div className="from-blur mb-7 flex w-full flex-col items-center justify-center bg-gradient-to-t p-1">
        {pageData.favoriteItems.length ? (
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
          })
        ) : (
          <div
            className="my-3 mx-5 flex w-[86vw]
            flex-col items-center justify-center rounded 
          border border-gray-300 py-5 px-2 text-gray-500 lg:py-0"
          >
            <h3>즐겨찾기에 상품을 추가하세요</h3>
          </div>
        )}
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
