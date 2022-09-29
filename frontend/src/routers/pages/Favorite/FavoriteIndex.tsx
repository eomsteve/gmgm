import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FavoriteIndexCart from '@components/charts/FavoriteIndexChart';
import SelectBox from '@components/favorite/FavoriteSelectBox';
import PriceChart from '@components/favorite/PriceChart';
import { getFavoriteItems } from '../../APIs/favoriteApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../modules/store';
import { getFavoriteSelect,getFavoritePageData } from '@apis/favoriteApi'
import type { FavoritePageData } from '@apis/favoriteApi'
interface FavoriteIndexPageProps {}

const FavoriteIndexPage: FunctionComponent<FavoriteIndexPageProps> = () => {
  const data = useSelector((state: RootState) => {
    // console.log(state.persistedReducer.authTokenReducer.authToken);
  });
  const [favoritePageData, setFavoritePageData] = useState<FavoritePageData>();
  useEffect(() => {
    const getPageData = async () =>{
      const data = await getFavoritePageData();
      console.log(data);
      if (typeof data !== 'undefined'){
        setFavoritePageData(data);
      }
    }
    getPageData();

  },[])
  return (
    <main className="flex w-full flex-col justify-center bg-[white] p-0">
      <h1>즐겨찾기 페이지</h1>
      {favoritePageData && <FavoriteIndexCart countryIndices={favoritePageData?.countryIndices} favoriteIndices={favoritePageData?.favoriteIndices}/>}
      {favoritePageData && <SelectBox pageData={favoritePageData.favoriteItems} />}
      {favoritePageData && <PriceChart favoriteTotalPrices={favoritePageData.favoriteTotalPrices}/>}
      <div className="p-2"></div>
    </main>
  );
};

export default FavoriteIndexPage;
