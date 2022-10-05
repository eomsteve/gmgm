import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FavoriteIndexCart from '@components/charts/FavoriteIndexChart';
import SelectBox from '@components/favorite/FavoriteSelectBox';
import PriceChart from '@components/favorite/PriceChart';
import { getFavoriteItems } from '../../APIs/favoriteApi';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@modules/store';
import { getFavoritePageDataRedux, clearAllGoodsList } from '@modules/FavoriteProductList';
import { getFavoriteSelect, getFavoritePageData } from '@apis/favoriteApi';
import type { FavoritePageData } from '@apis/favoriteApi';
import FavHeader from '@components/EmptyHeader';
import SpinnerPage from '@pages/Spinner'
interface FavoriteIndexPageProps {}

const FavoriteIndexPage: FunctionComponent<FavoriteIndexPageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const goodsRef = useRef();
  const {checkListItemRedux, isLoading} = useSelector((state: RootState) =>{
    console.log(state);
    
    return { checkListItemRedux : state.persistedReducer.favoriteProductListReducer.goods, isLoading : state.persistedReducer.favoriteProductListReducer.isLoading}
  })
  console.log("isLoading : ", isLoading);
  
  const [favoritePageData, setFavoritePageData] = useState<FavoritePageData>();
  useEffect(() => {
    const getPageData = async () => {
      const data = await dispatch(getFavoritePageDataRedux()).unwrap();
      console.log("index : ",data);
      if (typeof data !== 'undefined') {
        setFavoritePageData(data);
      }
    };
    getPageData();
    return (()=>{
      goodsRef.current = checkListItemRedux
      console.log("fav unmount : ",goodsRef.current);
      
    })
  }, [checkListItemRedux]);

  
  return (
    <>
    {isLoading && <SpinnerPage />}
      <FavHeader title={'즐겨찾기'} navigateRouter={''} />
      <main className="flex w-full flex-col justify-center bg-[white] p-5">
        
        {favoritePageData && (
          <FavoriteIndexCart
            countryIndices={favoritePageData?.countryIndices}
            favoriteIndices={favoritePageData?.favoriteIndices}
          />
        )}
        <hr className="mx-[-1.25rem] my-6 mt-3 w-screen" />
        {favoritePageData && <SelectBox pageData={favoritePageData} />}
        <hr className="mx-[-1.25rem] my-6 mt-2 w-screen" />
        {favoritePageData && (
          <PriceChart
            favoriteTotalPrices={favoritePageData.favoriteTotalPrices}
          />
        )}
        <div className="p-2"></div>
      </main>
    </>
  );
};

export default FavoriteIndexPage;
