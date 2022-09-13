import React, { FunctionComponent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface FavoritePageProps {}

const FavoritePage: FunctionComponent<FavoritePageProps> = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-[white]">
      this is Favorite page
    </main>
  );
};

export default FavoritePage;
