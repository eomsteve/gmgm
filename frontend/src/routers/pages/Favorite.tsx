import React, { FunctionComponent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TestChart from '../../components/charts/TestChart'

interface FavoritePageProps {}

const FavoritePage: FunctionComponent<FavoritePageProps> = () => {
  return (
    <main className="flex h-screen w-full flex-col bg-[white]">
      <TestChart />
      this is Favorite page
    </main>
  );
};

export default FavoritePage;
