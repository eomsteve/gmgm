import { FunctionComponent } from 'react';
import {  Outlet } from 'react-router-dom';

interface FavoritePageProps {}

const FavoritePage: FunctionComponent<FavoritePageProps> = () => {
  return <Outlet />;
};

export default FavoritePage;
