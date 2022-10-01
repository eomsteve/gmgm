import React, { FunctionComponent, useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import MainUserCard from '../../components/users/MainUserCard';
import { loadMain } from '@apis/main';
import HeaderComponent from '@components/EmptyHeader';
import EmptySquare from '@components/main/SquareInfo';
// import Tooltip from '@components/tooltiptest'

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  const [loadData, setLoadData] = useState();
  useEffect(() => {
    const loadPage = async () => {
      const loadMainData = await loadMain();
      console.log(loadMainData);

      // setLoadData(loadMainData);
    };
    loadPage();
  });
  return (
    <>
      <HeaderComponent title="홈" />
      <MainUserCard />
      <main className="mx-0 flex h-[90vh] w-full flex-col bg-[white]">
        <div className="mx-5 grid grid-cols-2 grid-rows-4">
          <EmptySquare bgColor="bg-lightsky" textColor="text-white" />
          <EmptySquare bgColor="bg-lemon" textColor="text-gray-500" />
          <EmptySquare bgColor="bg-peach" textColor="text-white" />
          <EmptySquare bgColor="bg-rouge" textColor="text-white" />
        </div>
        this is main page
      </main>
    </>
  );
};

export default Main;
