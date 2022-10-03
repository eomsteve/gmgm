import React, { FunctionComponent, useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import MainUserCard from '../../components/users/MainUserCard';
import MainGuestCard from '../../components/main/MainGuestCard';
import { loadMain } from '@apis/main';
import HeaderComponent from '@components/EmptyHeader';
import EmptySquare from '@components/main/SquareInfo';
import MainChecklist from '@components/main/MainChecklistComponent';
// import Tooltip from '@components/tooltiptest'
import type { MainData } from '@apis/main'
import { setAuthToken, removeAuthToken} from '@modules/Auth'
import type { RootState, AppDispatch } from '@src/modules/store';
import { useSelector, useDispatch } from 'react-redux'

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  const [loadData, setLoadData] = useState<MainData>();
  const { isLogin }  = useSelector((state: RootState)=>{
    return {
      isLogin : state.persistedReducer.authTokenReducer.isLogin
    }
  })
  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    const loadPage = async (token : string| null) => {
      const loadMainData = await loadMain(token);
      setLoadData(loadMainData)
    };
    loadPage(token);
  },[]);

  const isLoginState = () => !!localStorage.getItem("jwtToken");
  return (
    <>
      <HeaderComponent title="홈" />
      <main className="mx-0 flex w-full flex-col bg-[white]">
        {isLogin ? loadData && <MainUserCard username={loadData.username} email={"email1@xx.xx"}/>
        :<MainGuestCard />}
        {loadData && <div className="mx-8 grid grid-cols-2 gap-2 grid-rows-4">
          <EmptySquare bgColor="bg-deepsky" textColor="text-white" gridSize="row-span-2" cpi={loadData.cpi} isLogin={isLogin}/>
          <EmptySquare bgColor="bg-lightsky" textColor="text-gray-500" gridSize="row-span-1" news={loadData.newsList[0]} isLogin={isLogin}/>
          <EmptySquare bgColor="bg-lemon" textColor="text-gray-500" gridSize="row-span-1"news={loadData.newsList[1]} isLogin={isLogin}/>
          <EmptySquare bgColor="bg-peach" textColor="text-white" gridSize="row-span-2" favoriteIndex={loadData.favoriteIndex} isLogin={isLogin}/>
          <EmptySquare bgColor="bg-rouge" textColor="text-white" gridSize="row-span-2" gmgmIndex={loadData.gmgmIndex} isLogin={isLogin}/>
        </div>}
        {isLogin ? loadData && loadData.checklistList && <MainChecklist checkLists={loadData.checklistList}/> : <div>로그인이 필요한 서비스 입니다</div>}
      </main>
    </>
  );
};

export default Main;
