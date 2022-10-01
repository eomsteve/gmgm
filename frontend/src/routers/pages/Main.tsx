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
        <EmptySquare />
        this is main page
      </main>
    </>
  );
};

export default Main;
