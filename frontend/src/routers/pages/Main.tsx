import React, { FunctionComponent, useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import MainUserCard from '../../components/users/MainUserCard';
import MainGuestCard from '../../components/main/MainGuestCard';
import { loadMain } from '@apis/main';
import HeaderComponent from '@components/EmptyHeader';
import EmptySquare from '@components/main/SquareInfo';
import MainChecklist from '@components/main/MainChecklistComponent';
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
      <main className="mx-0 flex h-[90vh] w-full flex-col bg-[white]">
        <MainUserCard />
        <MainGuestCard />
        <div className="mx-8 grid grid-cols-2 gap-2 grid-rows-5">
          <EmptySquare bgColor="bg-deepsky" textColor="text-white" gridSize="row-span-2"/>
          <EmptySquare bgColor="bg-lightsky" textColor="text-gray-500" gridSize="row-span-1"/>
          <EmptySquare bgColor="bg-lemon" textColor="text-gray-500" gridSize="row-span-1"/>
          <EmptySquare bgColor="bg-peach" textColor="text-white" gridSize="row-span-2"/>
          <EmptySquare bgColor="bg-rouge" textColor="text-white" gridSize="row-span-2"/>
          <MainChecklist/>
        </div>
        this is main page
      </main>
    </>
  );
};

export default Main;
