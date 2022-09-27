import React, { FunctionComponent } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';


interface FavoritePageProps {}

const FavoritePage: FunctionComponent<FavoritePageProps> = () => {
  return (
    <Outlet />
  );
};

export default FavoritePage;
