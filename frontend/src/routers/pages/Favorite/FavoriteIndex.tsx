import React, { FunctionComponent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FavoriteIndexCart from '../../../components/charts/FavoriteIndexChart'
import SelectBox from '../../../components/favorite/FavoriteSelectBox'
import PriceChart from '../../../components/favorite/PriceChart'
import { getFavoriteItems } from '../../APIs/favoriteApi'
import {useSelector} from 'react-redux'
import type { RootState } from '../../../modules/store';
interface FavoriteIndexPageProps {}



const FavoriteIndexPage: FunctionComponent<FavoriteIndexPageProps> = () => {
  const data = useSelector((state : RootState)=>{
    // console.log(state.persistedReducer.authTokenReducer.authToken);
  })
  useEffect(() =>{
    // getFavoriteItems('m');
  },[])
  return (
    <main className="flex w-full flex-col justify-center p-0 bg-[white]">
      <h1>즐겨찾기 페이지</h1>
      <FavoriteIndexCart />
      <SelectBox optionList={['1']}/>
      <PriceChart />
      <div className="p-2">
      </div>
    </main>
  );
};

export default FavoriteIndexPage;
