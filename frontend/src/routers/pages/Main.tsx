import React, { FunctionComponent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainUserCard from '../../components/users/MainUserCard'
import Tooltip from '@components/tooltiptest'

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  return (
    <>
    <MainUserCard />
    <main className="mx-0 flex h-[90vh] w-full flex-col items-center justify-center bg-[white]">
    <Tooltip />

      this is main page
    </main>
    </>
  );
};

export default Main;
